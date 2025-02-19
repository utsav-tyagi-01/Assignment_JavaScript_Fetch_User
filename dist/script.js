    const container = document.getElementById("cards");
    const searchInput = document.getElementById("search");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const pageInfo = document.getElementById("page-info");

    let data = [];
    let pageUsers= [];
    let currPage = 1;
    const cards= 4;

    async function fetchData() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            data = await response.json();
            pageUsers = [...data]; 
            Cards();
        } catch (error) {
            console.error("There was an error loading the data...", error);
        }
    }

    function Cards() {
        container.innerHTML = "";
        if (pageUsers.length === 0) {
            container.innerHTML = "<h4>Sorry!  No Users Found</h4>";
            showPage();
            return;
        }

        const start = (currPage - 1) * cards;
        const end = start + cards;
        const currUsers = pageUsers.slice(start, end);

        currUsers.forEach((user) => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<h2>${user.name}</h2>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city} - ${user.address.zipcode}</p>
                <p><strong>Company:</strong> ${user.company.name} </p>
                <p><strong>Website:</strong> <a href="" target="_blank">${user.website}</a></p>`;
            container.appendChild(card);
        });

        showPage();
    }

    function showPage() {
        const totalPage = Math.ceil(pageUsers.length / cards);
        //pageInfo.innerText = `Page ${currPage} of ${totalPage || 1}`;

        // if(currPage === 1){
        // prevButton.disabled = true;
        // }
        // else{
        //     prevButton.disabled = false;
        // }
        // if(currPage >= totalPage){
        //     nextButton.disabled = true;
        // }
        // else{
        //     prevButton.disabled = false;
        // }
        pageInfo.innerHTML="";
        for (let i = 1; i <= totalPage; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerText = i;
            pageButton.classList.add("page-btn");
            if (i === currPage) pageButton.classList.add("active");

            pageButton.addEventListener("click", () => {
                currPage = i;
                Cards();
            });

            pageInfo.appendChild(pageButton);
        }
        prevButton.disabled = currPage === 1;
        nextButton.disabled = currPage >= totalPage;
        
    }

    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        pageUsers = data.filter((user) =>
            user.name.toLowerCase().includes(searchText)
        );
        currPage = 1;
        Cards();
    });

    
    prevButton.addEventListener("click", () => {
        if (currPage > 1) {
            currPage--;
            Cards();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currPage < Math.ceil(pageUsers.length / cards)) {
            currPage++;
            Cards();
        }
    });

    fetchData();
