// class Search {
//     constructor() {
//         this.app = document.getElementById('app');
        
//         this.searchLine = this.createElement('div', 'search-line');
//         this.searchInput = this.createElement('input', 'search-input');
//         this.searchLine.append(this.searchInput);
//         this.app.append(this.searchLine);
//     }

//     createElement (elementTag, elementClass) {
//         const element = document.createElement(elementTag);
//         if (elementClass) {
//             element.classList.add(elementClass);
//         }
//         return element 
//     }
// }


// class GetData {
//     constructor(Search) {
//         this.Search = Search;

//         this.Search.searchInput.addEventListener('keyup', function (){
//             console.log(1)
//         })
//     }
// }
function debounce(callee, timeoutMs) {

    return function perform(...args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
    }
}



document.querySelector('#input').addEventListener('input', debounce(() => {
    RepoList(input.value)
}, 1000))

// document.querySelector('#input').addEventListener('', searchRepo(input.value))  


async function searchRepo (input) {
    // let request = input.value;
    // console.log(input.value);
    let response = await fetch(`https://api.github.com/search/repositories?q=${input}`);
    let data = await response.json()
    console.log(data.items)
    return data.items
}

async function RepoList (data) {
    let RepoAnsw = await searchRepo(data);

    if (document.querySelector(".removable") != null) {
        document.querySelector(".removable").remove();
    }

    console.log(RepoAnsw[0].name);
    let List = document.createElement("ul")
    List.classList.add("removable");
    for (let i = 0; i < 5; i++) {
        let RepoListIt = document.createElement("li")
        RepoListIt.innerHTML = RepoAnsw[i].name
        List.append(RepoListIt)
        RepoListIt.addEventListener('click', () => addRepo(RepoAnsw[i]));
    }
    // return List
    // console.log(List.innerHTML)
    document.getElementById("result").append(List)
}

// input.addEventListener onclickS

// createElement (elementTag, elementClass) {
//             const element = document.createElement(elementTag);
//             if (elementClass) {
//                 element.classList.add(elementClass);
//             }
//             return element 
// }

// async function autoCmp (input) {
//     // let inputs = document.querySelectorAll(selector);
//     let ListFive = await RepoList(input); 
//     document.getElementById('result').append(ListFive);

    
// }




    function addRepo(repo) {
        let repoContainer = document.createElement("div");
        repoContainer.className = "container_repo-container";
        let repoInfo = document.createElement("div");
        repoInfo.className = "container_repo-info";
        repoInfo.innerText = `Name:${repo.name}\n Owner:${repo.owner.login}\n Stars:${repo.stargazers_count}`;
        repoContainer.append(repoInfo);
        let btn = document.createElement("button");
        btn.addEventListener("click", () => removeRepo(repoContainer));
        repoContainer.append(btn);
        document.body.append(repoContainer);
        document.getElementById("input").value = "";
        document.querySelector(".removable").remove();
    
    }
    
    function removeRepo(elem) {
        elem.remove();
    
    }