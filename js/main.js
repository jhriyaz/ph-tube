/**
 * The function fetchCategory fetches video categories from an API and dynamically creates buttons for
 * each category.
 */
document.getElementById('video_category')
const fetchCategory = async () => {
    const category = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await category.json()
    const categoryDiv = document.getElementById('video_category')
    data.data.forEach(category => {
        const categoryBtn = document.createElement('button')
        categoryBtn.classList.add(`${category.category_id}`)
        categoryBtn.innerHTML = `
        <button onclick=showVideos(${category.category_id}) class="btn-bg-custom category-button w-full" id="${'button' + category.category_id}">${category.category}</button>
        `
        console.log(category.category_id)
        categoryDiv.appendChild(categoryBtn)
    })
    // pre shown data
    showVideos(data.data[0].category_id)
}
fetchCategory()
previousActive = ''
currentlyActive = ''
let sortData;
let sortByView = () => {
    buttonClick++
    showVideos(previousActive)
}
/**
 * The `showVideos` function is responsible for fetching and displaying videos based on a given
 * category ID, and also handles highlighting the active category button.
 */

let buttonClick = 0;
const showVideos = (categoryId) => {
    /* This code block is responsible for highlighting the currently active category button and removing
    the highlight from the previously active category button. */
    if (previousActive == '') {
        currentlyActive = categoryId
        previousActive = categoryId
        document.getElementById('button' + categoryId).classList.add('activeButton', 'font-semibold')
    } else {
        document.getElementById('button' + previousActive).classList.remove('activeButton', 'font-semibold')
        currentlyActive = categoryId
        document.getElementById('button' + categoryId).classList.add('activeButton', 'font-semibold')
        previousActive = categoryId
    }
    const fetchVideo = async () => {
        const category = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
        const data = await category.json()

        if (buttonClick % 2 === 1) {
            sortData = data.data.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views))
        } else {
            sortData = data.data
        }

        const videoSection = document.getElementById('video-section')
        videoSection.innerHTML = ""
        /* This code block is checking if the fetched data has a length of 0, which means there are no
        videos in the category. If this condition is true, it replaces the inner HTML of the
        `videoSection` element with a message indicating that there is no content available. It
        displays an image and a text message saying "Oops!! Sorry, There is no content here". Finally,
        it returns to exit the function. */
        if (sortData.length === 0) {
            videoSection.innerHTML = `
            <div class="col-span-4 flex flex-col justify-center">   
            <img src=".//images/Icon.png" alt="404 Not Found" class="mx-auto" >
            <h1 class="text-2xl lg:text-9xl text-center pt-9">Oops!! Sorry, There is no content here</h1>
            </div>
            `
            return
        }

        /* The code block is iterating over each category in the `data` array and creating a `div`
        element dynamically for each category. The `div` element has a class of `card` and some
        additional styling classes. */
        sortData.forEach(category => {
            const videoDiv = document.createElement('div')
            videoDiv.classList.add('card', 'bg-base-100', 'shadow-xl', 'mx-auto')
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20"
                            height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_13_939)">
                            <path
                            d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z"
                            fill="#2568EF" />
                            <path
                                d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z"
                                fill="#FFFCEE" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_13_939">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                                </svg>`
            let { authors, title, others, thumbnail } = category
            const hours = parseInt(others.posted_date / 3600)
            const minutes = parseInt((others.posted_date % 3600) / 60)
            videoDiv.innerHTML = `
            <div class="relative h-[200px]"><img src="${thumbnail}" alt="thumbnail" class="rounded-lg w-full h-full" />
            <p class="absolute bottom-2 right-1 text-right bg-[#171717] text-[10px] text-white p-2 rounded-lg ${others.posted_date > 0 ? '' : 'hidden'}">${(hours > 0 || minutes > 0) ? hours + ' hours ' + minutes + ' minutes ago' : ''}</p> 
            </div>
            <div class="card-body grid grid-cols-7 gap-4">
            <img src="${authors[0].profile_picture}" alt="" class="col-span-1 rounded-full w-[40px] h-[40px]">
            <div class="col-span-6">
                <h2 class="card-title text-[#171717]">
                    ${title}
                </h2>
                <p class="flex gap-4 items-center text-[#171717b3] font-medium text-sm pt-2">${authors[0].profile_name} <span class=''>${authors[0]?.verified ? svg : ''} </span>
                </p>
               <p class="text-[#171717b3] font-medium text-sm">
                ${others.views}
               </p>
            </div>
        </div>
            `
            videoSection.appendChild(videoDiv)
        })
    }
    fetchVideo()
}