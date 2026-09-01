// ============================================================
// RESEARCHIQ - COMMERCIALIZATION FRONTEND
// ============================================================

// FastAPI backend URL

const API_URL =
    "http://127.0.0.1:8001";


// ============================================================
// DOM ELEMENTS
// ============================================================

const form =
    document.getElementById(
        "commercializationForm"
    );


const analyzeButton =
    document.getElementById(
        "analyzeButton"
    );


const analyzeButtonText =
    document.getElementById(
        "analyzeButtonText"
    );


const analyzeSpinner =
    document.getElementById(
        "analyzeSpinner"
    );


const errorBox =
    document.getElementById(
        "commercializationError"
    );


const resultsSection =
    document.getElementById(
        "commercializationResults"
    );


const overallScore =
    document.getElementById(
        "overallScore"
    );


const readinessLevel =
    document.getElementById(
        "readinessLevel"
    );


const scoreCircleValue =
    document.getElementById(
        "scoreCircleValue"
    );


// ============================================================
// RECOMMENDATION CONTAINERS
// ============================================================

const productRecommendations =
    document.getElementById(
        "productRecommendations"
    );


const licensingRecommendations =
    document.getElementById(
        "licensingRecommendations"
    );


const startupRecommendations =
    document.getElementById(
        "startupRecommendations"
    );


const industryRecommendations =
    document.getElementById(
        "industryRecommendations"
    );


const nextStepsRecommendations =
    document.getElementById(
        "nextStepsRecommendations"
    );


// ============================================================
// FORM SUBMIT
// ============================================================

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            hideError();


            // ==================================================
            // GET FORM VALUES
            // ==================================================

            const innovationTitle =
                document
                    .getElementById(
                        "innovationTitle"
                    )
                    .value
                    .trim();


            const innovationDescription =
                document
                    .getElementById(
                        "innovationDescription"
                    )
                    .value
                    .trim();


            const technology =
                document
                    .getElementById(
                        "technology"
                    )
                    .value
                    .trim();


            const targetMarket =
                document
                    .getElementById(
                        "targetMarket"
                    )
                    .value
                    .trim();


            const patentStatus =
                document
                    .getElementById(
                        "patentStatus"
                    )
                    .value;


            const technologyReadinessLevel =
                Number(
                    document
                        .getElementById(
                            "technologyReadinessLevel"
                        )
                        .value
                );


            // ==================================================
            // VALIDATION
            // ==================================================

            if (
                innovationTitle.length < 2
            ) {

                showError(
                    "Please enter a valid innovation title."
                );

                return;

            }


            if (
                innovationDescription.length < 10
            ) {

                showError(
                    "Innovation description must contain at least 10 characters."
                );

                return;

            }


            // ==================================================
            // LOADING
            // ==================================================

            setLoading(true);


            try {


                // ==================================================
                // SEND REQUEST
                // ==================================================

                const response =
                    await fetch(
                        `${API_URL}/commercialization/recommend`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                innovation_title:
                                    innovationTitle,

                                innovation_description:
                                    innovationDescription,

                                technology:
                                    technology,

                                target_market:
                                    targetMarket,

                                patent_status:
                                    patentStatus,

                                technology_readiness_level:
                                    technologyReadinessLevel

                            })

                        }
                    );


                // ==================================================
                // RESPONSE ERROR
                // ==================================================

                if (!response.ok) {

                    let errorMessage =
                        "Unable to analyze commercialization potential.";


                    try {

                        const errorData =
                            await response.json();


                        if (
                            errorData.detail
                        ) {

                            errorMessage =
                                errorData.detail;

                        }

                    } catch (error) {

                        console.error(
                            "Error reading backend response:",
                            error
                        );

                    }


                    throw new Error(
                        errorMessage
                    );

                }


                // ==================================================
                // JSON RESULT
                // ==================================================

                const data =
                    await response.json();


                // ==================================================
                // SUCCESS VALIDATION
                // ==================================================

                if (
                    data.success === false
                ) {

                    throw new Error(
                        "Commercialization analysis failed."
                    );

                }


                // ==================================================
                // DISPLAY RESULTS
                // ==================================================

                displayResults(data);


            } catch (error) {

                console.error(
                    "Commercialization Error:",
                    error
                );


                showError(
                    error.message ||
                    "Unable to analyze commercialization potential. Please make sure the ResearchIQ FastAPI backend is running on port 8001."
                );


            } finally {

                setLoading(false);

            }

        }
    );

}


// ============================================================
// DISPLAY RESULTS
// ============================================================

function displayResults(data) {


    // ==========================================================
    // OVERALL SCORE
    // ==========================================================

    const score =
        Number(
            data.overall_score || 0
        );


    overallScore.textContent =
        score.toFixed(1);


    scoreCircleValue.textContent =
        Math.round(score);


    // ==========================================================
    // READINESS
    // ==========================================================

    readinessLevel.textContent =
        data.readiness_level ||
        "Unknown";


    // ==========================================================
    // CLEAR OLD RESULTS
    // ==========================================================

    productRecommendations.innerHTML =
        "";

    licensingRecommendations.innerHTML =
        "";

    startupRecommendations.innerHTML =
        "";

    industryRecommendations.innerHTML =
        "";

    nextStepsRecommendations.innerHTML =
        "";


    // ==========================================================
    // GET RECOMMENDATIONS
    // ==========================================================

    const recommendations =
        Array.isArray(
            data.recommendations
        )
            ? data.recommendations
            : [];


    // ==========================================================
    // DISPLAY RECOMMENDATIONS
    // ==========================================================

    recommendations.forEach(
        function (recommendation) {


            const card =
                createRecommendationCard(
                    recommendation
                );


            const strategy =
                String(
                    recommendation.strategy ||
                    ""
                )
                .toLowerCase();


            // ==================================================
            // PRODUCT
            // ==================================================

            if (
                strategy.includes(
                    "product"
                )
            ) {

                productRecommendations.appendChild(
                    card
                );

            }


            // ==================================================
            // LICENSING
            // ==================================================

            else if (
                strategy.includes(
                    "licensing"
                )
            ) {

                licensingRecommendations.appendChild(
                    card
                );

            }


            // ==================================================
            // STARTUP
            // ==================================================

            else if (
                strategy.includes(
                    "startup"
                ) ||
                strategy.includes(
                    "spin-off"
                ) ||
                strategy.includes(
                    "spinoff"
                )
            ) {

                startupRecommendations.appendChild(
                    card
                );

            }


            // ==================================================
            // PARTNERSHIP
            // ==================================================

            else if (
                strategy.includes(
                    "partnership"
                )
            ) {

                industryRecommendations.appendChild(
                    card
                );

            }


            // ==================================================
            // RESEARCH TO MARKET
            // ==================================================

            else if (
                strategy.includes(
                    "research-to-market"
                ) ||
                strategy.includes(
                    "research to market"
                )
            ) {

                nextStepsRecommendations.appendChild(
                    card
                );

            }


            // ==================================================
            // UNKNOWN STRATEGY
            // ==================================================

            else {

                nextStepsRecommendations.appendChild(
                    card
                );

            }

        }
    );


    // ==========================================================
    // SHOW RESULTS
    // ==========================================================

    resultsSection.style.display =
        "block";


    // ==========================================================
    // SCROLL
    // ==========================================================

    setTimeout(
        function () {

            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        100
    );

}


// ============================================================
// CREATE RECOMMENDATION CARD
// ============================================================

function createRecommendationCard(
    recommendation
) {


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "recommendation-card";


    // ==========================================================
    // STRATEGY
    // ==========================================================

    const strategy =
        document.createElement(
            "span"
        );


    strategy.className =
        "recommendation-strategy";


    strategy.textContent =
        recommendation.strategy ||
        "Commercialization Strategy";


    // ==========================================================
    // TITLE
    // ==========================================================

    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        recommendation.title ||
        "Recommended Strategy";


    // ==========================================================
    // DESCRIPTION
    // ==========================================================

    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        recommendation.description ||
        "";


    // ==========================================================
    // SCORE
    // ==========================================================

    const score =
        document.createElement(
            "div"
        );


    score.className =
        "recommendation-score";


    score.innerHTML = `
        <strong>
            ${Number(
                recommendation.commercialization_score || 0
            ).toFixed(1)}
        </strong>

        <span>
            Match Score
        </span>
    `;


    // ==========================================================
    // TARGET MARKET
    // ==========================================================

    const market =
        document.createElement(
            "div"
        );


    market.className =
        "recommendation-detail";


    market.innerHTML = `
        <span>
            Target Market
        </span>

        <strong>
            ${escapeHtml(
                recommendation.target_market ||
                "Not specified"
            )}
        </strong>
    `;


    // ==========================================================
    // READINESS
    // ==========================================================

    const readiness =
        document.createElement(
            "div"
        );


    readiness.className =
        "recommendation-detail";


    readiness.innerHTML = `
        <span>
            Readiness
        </span>

        <strong>
            ${escapeHtml(
                recommendation.readiness_level ||
                "Unknown"
            )}
        </strong>
    `;


    // ==========================================================
    // RECOMMENDED ACTION
    // ==========================================================

    const action =
        document.createElement(
            "div"
        );


    action.className =
        "recommendation-action";


    action.innerHTML = `
        <span>
            Recommended Action
        </span>

        <p>
            ${escapeHtml(
                recommendation.recommended_action ||
                ""
            )}
        </p>
    `;


    // ==========================================================
    // APPEND
    // ==========================================================

    card.appendChild(
        strategy
    );


    card.appendChild(
        title
    );


    card.appendChild(
        description
    );


    card.appendChild(
        score
    );


    card.appendChild(
        market
    );


    card.appendChild(
        readiness
    );


    card.appendChild(
        action
    );


    return card;

}


// ============================================================
// LOADING STATE
// ============================================================

function setLoading(
    isLoading
) {


    if (isLoading) {


        analyzeButton.disabled =
            true;


        analyzeButtonText.style.display =
            "none";


        analyzeSpinner.style.display =
            "inline";


    } else {


        analyzeButton.disabled =
            false;


        analyzeButtonText.style.display =
            "inline";


        analyzeSpinner.style.display =
            "none";

    }

}


// ============================================================
// ERROR
// ============================================================

function showError(
    message
) {


    errorBox.textContent =
        message;


    errorBox.style.display =
        "block";

}


function hideError() {


    errorBox.textContent =
        "";


    errorBox.style.display =
        "none";

}


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHtml(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ============================================================
// BACK TO HOME
// ============================================================

const backToHome =
    document.getElementById(
        "backToHome"
    );


if (backToHome) {

    backToHome.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );

}


// ============================================================
// NOTIFICATION
// ============================================================

const notificationButton =
    document.getElementById(
        "notificationButton"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function () {

            alert(
                "No new notifications."
            );

        }
    );

}


// ============================================================
// PREMIUM
// ============================================================

const premiumButton =
    document.getElementById(
        "premiumButton"
    );


if (premiumButton) {

    premiumButton.addEventListener(
        "click",
        function () {

            alert(
                "Premium features coming soon."
            );

        }
    );

}


// ============================================================
// SIDEBAR NAVIGATION
// ============================================================

const sidebarItems =
    document.querySelectorAll(
        ".sidebar-item[data-section]"
    );


sidebarItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const section =
                    item.getAttribute(
                        "data-section"
                    );


                // ==================================================
                // COMMERCIALIZATION
                // ==================================================

                if (
                    section ===
                    "commercialization"
                ) {

                    // Already on this page.
                    // No need to reload.

                    return;

                }


                // ==================================================
                // OTHER INTELLIGENCE SECTIONS
                // ==================================================

                if (
                    section === "research" ||
                    section === "patent" ||
                    section === "ai"
                ) {

                    window.location.href =
                        "funding.html";

                }

            }
        );

    }
);