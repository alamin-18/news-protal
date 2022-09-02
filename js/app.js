const categoryload = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayCategory(data.data.news_category)
};

const displayCategory = (data) =>{
    const newsMenu = document.getElementById("news-menu")
  data.forEach(category =>{
    // console.log(category)
    const li = document.createElement("li")
    li.innerHTML = `<button onclick=categoryClick('${category.category_id}') class="btn btn-active ">${category.category_name}</button>`
    // li.innerText = `${category.category_name}`
    newsMenu.appendChild(li)
  })
}

const categoryClick = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayNews(data.data)
}

const displayNews = (data) =>{
    const newsContainer = document.getElementById("news-container")
    newsContainer.textContent =``
    data.forEach(news =>{
        console.log(news)
        const div = document.createElement("div")
        div.innerHTML = `
                <div class="card lg:card-side bg-base-100 shadow-xl mb-10">
                    <figure><img src="${news.thumbnail_url ? news.thumbnail_url:"no image found"}" alt="Album"></figure>
                    <div class="card-body">
                      <h2 class="card-title">${news.title}</h2>
                      <p>${news.details.slice(0,250)+"..."}</p>
                      <div class="card-actions justify-evenly items-center ">
                            <div class="flex justify-center items-center gap-4">
                                <img class="w-16 mask mask-circle" src="${news.author.img}" />
                                <div>
                                <h4>${news.author.name}</h4>
                                <p>${news.author.published_date}</p>
                                </div>
                            </div>
                                <div>
                                    <div class="rating">
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                    </div>
                                
                                    </div>  
                                <div>
                                <div class="stat">
                                <div class="stat-value text-secondary">${news.total_view}</div>
                                </div>
                                </div>
                                <div>
                                
                                <label onclick=newsDetails('${news._id}') for="my-modal-5" class="btn modal-button">open modal</label>

                                </div>
                        </div>
                    </div>
                  </div>
        
        `
        newsContainer.appendChild(div)
    })
}

const newsDetails = async(news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url)
    const data = await res.json()
    dispalyDetails(data.data)
}

const dispalyDetails = (data) =>{
    
    const modal = document.getElementById("modal")
    data.forEach(details =>{
        const newsDetails = document.getElementById("news-details")
        newsDetails.innerText =`${details.details}`
    })
}

categoryload()


