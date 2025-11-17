// ================= Elements =====================

let newsCategCardsSect = document.getElementById("newsCategCardsSect")
let reviewsCardSect = document.getElementById("reviewsCardSect")
let newsCardsCont = document.getElementById("newsCardsCont")

let appleNews = document.getElementById("appleNews")
let teslaNews = document.getElementById("teslaNews")
let businessHeadlines = document.getElementById("businessHeadlines")
let techCrunchStories = document.getElementById("techCrunchStories")
let wallStreetJournal = document.getElementById("wallStreetJournal")

// ================= NEWS CATEGORIES =====================

let categories = [appleNews , teslaNews , businessHeadlines , techCrunchStories , wallStreetJournal]

// ================= CATEGORIES HANDLING =====================

categories.forEach((categ) => categ.addEventListener("click" , (e) => {

    newsCategCardsSect.classList.add("hidden")
    reviewsCardSect.classList.add("hidden")
    let url = e.currentTarget.getAttribute("newsCategUrl")

    fetch(url)
    .then((response) => response.json())
    .then( (data) => {
        
        // GLOBAL STATE
        let cardsLimit = 9

        // ================= CREATE CARD FUNCTION =====================

        function createCard(article) {

            const image        = article.urlToImage ? article.urlToImage : "https://via.placeholder.com/400x200";
            const description  = article.description ? article.description : "No description available";
            const title        = article.title ? article.title : "No title available";
            const sourceName   = article.source.name ? article.source.name : "Unknown Source";
            const publishedAt  = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "";
            const urlToArticle = article.url ? article.url : "#";

            return `
            <article class="fade-in bg-white rounded-3xl shadow-2xl cursor-pointer duration-400 overflow-hidden hover:scale-[1.01] transition-transform">
          
                <!-- Image -->
                <div class="relative h-55">
                    <img src="${image}" alt="Feature image" class="w-full h-full object-cover"/>
                    <div class="absolute left-4 top-4 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1">
                        ${sourceName} · Trending
                    </div>
                </div>

                <!-- Details -->
                <div class="p-6 flex flex-col min-h-78 justify-between">
                    
                    <div class="">
                        <h3 class="text-[17px] font-extrabold text-gray-900 mb-3">${title.length >= 75 ? title.slice(0 , 75) + "..." : title}</h3>
                        <p class="text-gray-600 text-sm mb-4">${description.length >= 180 ? description.slice(0 , 180) + "..." : description}</p>
                    </div>
                    
                    <div>
                        <div class="flex items-center justify-between text-sm text-gray-500 pt-2">
                
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-user text-[18px]"></i>
                                <span>${sourceName}</span>
                            </div>

                            <div class="ml-4 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v4a2 2 0 002 2h3l3 3v-8l3-3h6"></path></svg>
                                <span>${publishedAt}</span>
                            </div>

                        </div>

                        <!-- Actions -->
                        <div class="mt-4 flex items-center gap-3">
                
                            <a href="${urlToArticle}" target="_blank" class="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
                                Read Article
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                            <button class="px-4 py-2 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition">
                                Save
                            </button>
                            <div class="ml-auto text-gray-400 text-sm">• • •</div>
                
                        </div>
                    </div>

                </div>

            </article>
            `

        }

        // ================= RENDER NEWS CARD FUNCTION =====================

        function renderCards(articles) {

            section.innerHTML = ""; // old cards delete (COMMENT: refresh section)

            articles.slice(0, cardsLimit).forEach(article => {
                section.innerHTML += createCard(article);
            });
            
        }

        // ================= CREATE SECTION FOR CARDS =====================

        let section = document.getElementById("newsCardsSection");
        if (!section) {
            section = document.createElement("div")
            section.id = "newsCardsSection";
            section.className = "mx-15 mt-30 my-10 px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            newsCardsCont.appendChild(section)
        }

        const articles = data.articles
        renderCards(articles)

        // ================= LOAD MORE BUTTON =====================

        let btnDiv = document.createElement("div")
        btnDiv.className = "flex flex-row justify-center"

        let btn = document.createElement("button")
        btn.textContent = "Load More"
        btn.className = "w-80 mb-15 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-md transition duration-500 cursor-pointer hover:scale-95"
        
        btn.onclick = () => {
            cardsLimit += 10
            renderCards(articles);
            if (cardsLimit >= articles.length) return btn.style.display = "none"
        }

        btnDiv.appendChild(btn)
        newsCardsCont.appendChild(btnDiv)

    } )

}))


// ================= HOME|REVIEWS|ABOUT BUTTON HANDLING =====================

let homeBtn = document.getElementById("homeBtn")
let reviewsBtn = document.getElementById("reviewsBtn")
let aboutBtn = document.getElementById("aboutBtn")

homeBtn.addEventListener("click" , () => {
    newsCategCardsSect.classList.remove("hidden")
    reviewsCardSect.classList.remove("hidden")
    newsCardsCont.innerHTML = ""
    window.scrollTo({ top: 0, behavior: "smooth" });
})

reviewsBtn.onclick = () => {
    newsCategCardsSect.classList.remove("hidden")
    reviewsCardSect.classList.remove("hidden")
    newsCardsCont.innerHTML = ""
    reviewsCardSect.scrollIntoView({ behavior: "smooth" })
}

aboutBtn.onclick = () => {
    newsCategCardsSect.classList.remove("hidden")
    reviewsCardSect.classList.remove("hidden")
    newsCardsCont.innerHTML = ""
    document.getElementById("footerSect").scrollIntoView({ behavior: "smooth" })
}
