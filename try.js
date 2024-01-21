let paginationBox = document.getElementById("foot");
async function fetchRepositories() {
  const username = document.getElementById("username").value;
  const repositoriesContainer = document.getElementById("repositories");
  const languagesContainer = document.getElementById("languages");

  // Set "Loading..." message immediately
  repositoriesContainer.innerHTML = "";
  languagesContainer.innerHTML = "Loading..."; // Clear languages container

  try {
    
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${itemsPerPage}`
    );
    const repositories = await response.json();
    if (response.ok) {
      await displayLanguages(repositories);
    } else {
      languagesContainer.innerHTML = `Error: ${
        repositories.message || response.statusText
      }`;
    }
  } catch (error) {
    languagesContainer.innerHTML =
      "An error occurred while fetching repositories.";
    console.error(error);
  }
}



function displayRepositories(repositories) {
  const repositoriesContainer = document.getElementById("repositories");

  if (repositories.length === 0) {
    repositoriesContainer.innerHTML = "No repositories found.";
    return;
  }

  repositoriesContainer.innerHTML = "";

  const flexContainer = document.createElement("div");
  flexContainer.id = "repository"; // Add the id for styling

  repositories.forEach((repo) => {
    const div = document.createElement("div");
    div.className = "repository";

    const p = document.createElement("p");
    p.className = "repository-name";
    p.textContent = repo.name;

    div.appendChild(p);
    flexContainer.appendChild(div);
  });

  repositoriesContainer.appendChild(flexContainer);
}


async function displayLanguages(repositories) {
  const languagesContainer = document.getElementById("languages");

  if (repositories.length === 0) {
    languagesContainer.innerHTML = "No repositories found.";
    return;
  }

  languagesContainer.innerHTML = "";

  const flexContainer = document.createElement("div");
  flexContainer.className = "flex-container";

  for (const repo of repositories) {
    const languagesResponse = await fetch(
      `https://api.github.com/repos/${repo.full_name}/languages`
    );
    const languagesData = await languagesResponse.json();

    if (languagesResponse.ok) {
      const div = document.createElement("div");
      div.className = "languages-box";

      const p = document.createElement("p");
      p.textContent = repo.name;
      p.style.color = "#428bca";
      p.style.fontSize = "24px";
      div.appendChild(p);

      const languagesList = document.createElement("ul");
      languagesList.className = "languages-list";

      if (Object.keys(languagesData).length === 0) {
       
        const li = document.createElement("li");
        li.className = "languages-item";
        li.textContent = "Null";
        languagesList.appendChild(li);
      } else {
        Object.keys(languagesData).forEach((language) => {
          const li = document.createElement("li");
          li.className = "languages-item";
          li.textContent = language; // Remove the count here

          languagesList.appendChild(li);
          li.style.background = "#428bca";
          li.style.padding = "8px";
          li.style.borderRadius = "5px";
          li.style.color = "white";
        });
      }

      div.appendChild(languagesList);
      flexContainer.appendChild(div);
    } else {
      
      const div = document.createElement("div");
      div.className = "languages-box";

      const p = document.createElement("p");
      p.textContent = repo.name;
      p.style.color = "red"; 
      div.appendChild(p);

      const errorMessage = document.createElement("p");
      errorMessage.textContent = `Error: ${
        languagesData.message || languagesResponse.statusText
      }`;
      errorMessage.style.color = "red";
      div.appendChild(errorMessage);

      flexContainer.appendChild(div);
    }
  }

  languagesContainer.appendChild(flexContainer);
}





async function displayLanguages(repositories) {
  const languagesContainer = document.getElementById("languages");

  if (repositories.length === 0) {
    languagesContainer.innerHTML = "No repositories found.";
    return;
  }

  languagesContainer.innerHTML = ""; 

  const ul = document.createElement("ul");
  ul.className = "languages-list";

  for (const repo of repositories) {
    const languagesResponse = await fetch(
      `https://api.github.com/repos/${repo.full_name}/languages`
    );
    const languagesData = await languagesResponse.json();

    if (languagesResponse.ok) {
      const div = document.createElement("div");
      div.className = "languages-box";

      const p = document.createElement("p");
      p.textContent = repo.name;
      p.style.color = "#428bca";
      p.style.fontSize = "24px";
      div.appendChild(p);

      const languagesList = document.createElement("ul");
      languagesList.className = "languages-list";

      if (Object.keys(languagesData).length === 0) {
       
        const li = document.createElement("li");
        li.className = "languages-item";
        li.textContent = "Null";
        li.style.background = "#428bca";
          li.style.padding = "8px";
          li.style.borderRadius = "5px";
          li.style.color = "white";
        languagesList.appendChild(li);
      } else {
        Object.keys(languagesData).forEach((language) => {
          const li = document.createElement("li");
          li.className = "languages-item";
          li.textContent = language; // Remove the count here

          languagesList.appendChild(li);
          li.style.background = "#428bca";
          li.style.padding = "8px";
          li.style.borderRadius = "5px";
          li.style.color = "white";
        });
      }

      div.appendChild(languagesList);
      languagesContainer.appendChild(div);
    } else {
     
      const div = document.createElement("div");
      div.className = "languages-box";

      const p = document.createElement("p");
      p.textContent = repo.name;
      p.style.color = "red"; // Set color to indicate an error
      div.appendChild(p);

      const errorMessage = document.createElement("p");
      errorMessage.textContent = `Error: ${
        languagesData.message || languagesResponse.statusText
      }`;
      errorMessage.style.color = "red";
      div.appendChild(errorMessage);

      languagesContainer.appendChild(div);
    }
  }
}

  

let currentPage = 1;
const itemsPerPage = 10; // You can adjust this as needed
function nextPage() {
  currentPage++;
  fetchRepositories();
  updatePageNumber();
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchRepositories();
    updatePageNumber();
  }
}

function updatePageNumber() {
  document.getElementById("page-number").innerText = `Page: ${currentPage}`;
}
