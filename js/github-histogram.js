window.initHistogram = function() {
    const ctx = document.getElementById('githubHistogram');
    if (!ctx) return;

    // Generate a logically filled mock data array for 52 weeks (an academic year cycle)
    const generateLogicalCommits = () => {
        const data = [];
        for (let week = 1; week <= 52; week++) {
            let baseCommits = 0;
            let variance = Math.floor(Math.random() * 10); // Random variance

            if (week >= 26 && week <= 34) {
                // Summer break (July - August): very low activity
                baseCommits = 2 + Math.floor(Math.random() * 3);
                variance = 0;
            } else if ((week >= 17 && week <= 25) || (week >= 48 && week <= 52)) {
                // Finals / End of Semester projects: high activity peaks
                baseCommits = 45 + Math.floor(Math.random() * 20);
            } else if (week >= 9 && week <= 16) {
                // Midterms: medium-high activity
                baseCommits = 30 + Math.floor(Math.random() * 15);
            } else {
                // Normal school weeks
                baseCommits = 15 + Math.floor(Math.random() * 10);
            }
            
            data.push(baseCommits + variance);
        }
        return data;
    };

    const realisticData = generateLogicalCommits();
    const labels = Array.from({length: 52}, (_, i) => `Week ${i + 1}`);

    // Draw the chart using Chart.js
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Commits',
                data: realisticData,
                backgroundColor: '#e58f35', // Orange color from design
                borderColor: '#c67828',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Commits'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Last 52 Weeks'
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'cs-efrei GitHub Activity',
                    font: {
                        size: 18,
                        family: "'Gilroy', sans-serif"
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    // We will now call this from loader.js after injecting the canvas, 
    // but keep a fallback just in case the canvas is hardcoded.
    setTimeout(() => {
        if (document.getElementById('githubHistogram') && !document.getElementById('githubHistogram').classList.contains('initialized')) {
            document.getElementById('githubHistogram').classList.add('initialized');
            window.initHistogram();
        }
    }, 100);
});
