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
    li.innerHTML = `<button onclick=categoryClick(${category.category_id}) class="btn btn-active ">${category.category_name}</button>`
    // li.innerText = `${category.category_name}`
    newsMenu.appendChild(li)
  })
}

const categoryClick = async(category_id) =>{
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
}
categoryload()