const categoryload = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayCategory(data.data.news_category)
    }
    catch (errow){
        console.log(errow)
    }
};


const displayCategory = (data) =>{
   
    const newsMenu = document.getElementById("news-menu")
    data.forEach(category =>{
        
    const li = document.createElement("li")
    li.innerHTML = `<button mb-6 onclick=categoryClick('${category.category_id}') class="btn btn-active ">${category.category_name}</button>`
    
    newsMenu.appendChild(li)
    
    
  });
  
  
};

// category click area
const categoryClick = async(id) =>{
    spinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayNews(data.data)
    }
    catch (errow){
        console.log(errow)
    }
};
// category click area ends

// news updata display start
const displayNews = (data) =>{
    
    
    // sort cart
    data.sort((a, b) => {
        return b.total_view - a.total_view;
    });
     // sort cart 

    //  alert section start
    const foundData = document.getElementById("found-alert")
    const noData = document.getElementById("no-found")
    if(data.length === 0){
        noData.classList.remove("hidden")
        foundData.classList.add("hidden")
       
    }
    else{
        const foundNews = document.getElementById("news-found")
        foundNews.innerText = `${data.length}`
        foundData.classList.remove("hidden")
        noData.classList.add("hidden")
    }
    //  alert section ends

    // card contain
    const newsContainer = document.getElementById("news-container")
    
    newsContainer.textContent =``
    data.forEach(news =>{
        
    
        const div = document.createElement("div")
        div.innerHTML = `
                <div class="card lg:card-side  bg-base-100 shadow-xl mb-10">
                    <figure><img class="w-full" src="${news.thumbnail_url ? news.thumbnail_url:"no image found"}" alt="Album"></figure>
                    <div class="card-body">
                      <h2 class="card-title">${news.title}</h2>
                      <p>${news.details.slice(0,250)+"..."}</p>
                      <div class="card-actions flex justify-evenly items-center sm:mt-10 ">
                         <div class="flex justify-center items-center gap-4">
                                <img class="w-16 sm:w-10 mask mask-circle" src="${news.author.img}" />
                                <div>
                                <h4>${news.author.name ? news.author.name : "no name found"}</h4>
                                <p>${news.author.published_date}</p>
                                </div>
                            </div>
                                  
                                <div class="">
                                <div class="stat">
                                <div>
                                </div>
                                <div class="stat-value text-secondary"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : "no view" }</div>
                                </div>
                                </div>
                                <div>
                                
                                <label onclick=newsDetails('${news._id}') for="my-modal-5" class="btn modal-button">Details</label>

                                </div>
                        </div>
                    </div>
                  </div>
        
        `
        newsContainer.appendChild(div)
        
    });
    
    spinner(false) 
};
// news updata display ends

// detall news uppdata
const newsDetails = async(news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try{
        const res = await fetch(url)
        const data = await res.json()
        dispalyDetails(data.data)
    }
    catch(errow){
        console.log(errow)
    }
};
// detall news uppdata ends

// detall news uppdata display

const dispalyDetails = (data) =>{
    // foreach start
    data.forEach(details =>{
        const modalBody= document.getElementById("modal-body")
        
        modalBody.innerHTML = `
        <div class=" ">
                        <figure><img class="w-full" src="${details.image_url}" alt="Album"></figure>
                        <div class="card-body">
                          <h2 id="news-title" class="card-title">${details.title}</h2>
                          <p>${details.details}</p>
                          <div class="card-actions justify-evenly items-center ">
                                <div class="flex justify-center items-center gap-4">
                                    <img class="w-16 mask mask-circle" src="${details.author.img}" />
                                    <div>
                                    <h4>${details.author.name ? details.author.name : "no name found"}</h4>
                                    <p></p>
                                    </div>
                                </div>  
                                    <div>
                                    <div class="stat">
                                    <div class="stat-value text-secondary"><i class="fa-solid fa-eye"></i> ${details.total_view ? details.total_view : "no view"}</div>
                                    </div>
                            </div>
                        
                            <div class="modal-action">
                            <label for="my-modal-5" class="btn">close!</label>
                      </div>
                      </div>
                        </div>
                      
        `
    })
    // foreach ends

    
};
// detall news uppdata display ends

// spinner
const spinner = isLodding =>{
    const spinner = document.getElementById("spinner-progress")
    if(isLodding === true){
        spinner.innerHTML =`
        <progress  class="progress w-full bg-red-700"></progress>
        `
        
    }
    else{
        spinner.innerHTML =`
        <progress  class="progress w-full bg-red-700 hidden"></progress>
        `
    }
}
categoryClick('08')
categoryload()


