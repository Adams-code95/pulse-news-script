const blogUrl = "https://pulsnewscast.blogspot.com";
let startIndex = 1;
const postsPerPage = 5;
let currentLabel = "";

function buildFeedUrl(label = "", start = 1) {
  const labelPart = label ? `/-/` + encodeURIComponent(label) : '';
  return `${blogUrl}/feeds/posts/default${labelPart}?alt=json&max-results=${postsPerPage}&start-index=${start}`;
}

function loadPosts(label = "") {
  currentLabel = label;
  startIndex = 1;
  document.getElementById("news-container").innerHTML = "<p>Loading news...</p>";
  fetchPosts(label, startIndex, true);
}

function loadMore() {
  startIndex += postsPerPage;
  fetchPosts(currentLabel, startIndex, false);
}

function fetchPosts(label, start, reset) {
  fetch(buildFeedUrl(label, start))
    .then(res => res.json())
    .then(data => {
      const entries = data.feed.entry || [];
      let html = "";

      if (reset && entries.length > 0) {
        const first = entries[0];
        const title = first.title.$t;
        const link = first.link.find(l => l.rel === "alternate").href;
        const img = first.media$thumbnail ? first.media$thumbnail.url : "https://via.placeholder.com/600x300";
        const date = new Date(first.published.$t).toDateString();
        const summary = first.summary?.$t.slice(0, 120) + "...";

        html += `
          <div class="featured-article">
            <a href="${link}" target="_blank">
              <img src="${img}" alt="${title}">
              <h2>${title}</h2>
            </a>
            <div class="date">🗓️ ${date}</div>
            <p>${summary}</p>
          </div>
          <div class="sub-articles">
        `;
        entries.shift();
      } else if (!reset) {
        html += `<div class="sub-articles">`;
      }

      entries.forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === "alternate").href;
        const img = entry.media$thumbnail ? entry.media$thumbnail.url : "https://via.placeholder.com/150";
        const date = new Date(entry.published.$t).toDateString();
        const summary = entry.summary?.$t.slice(0, 100) + "...";

        html += `
          <div class="sub-article">
            <a href="${link}" target="_blank">
              <img src="${img}" alt="${title}">
            </a>
            <div class="text">
              <p><a href="${link}" target="_blank"><strong>${title}</strong></a></p>
              <div class="date">🗓️ ${date}</div>
              <p>${summary}</p>
            </div>
          </div>
        `;
      });

      html += `</div>`;

      if (reset) {
        document.getElementById("news-container").innerHTML = html;
      } else {
        document.getElementById("news-container").innerHTML += html;
      }
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
      document.getElementById("news-container").innerHTML = "<p>Error loading news.</p>";
    });
}

// Initial load
window.addEventListener("DOMContentLoaded", () => loadPosts());const blogUrl = "https://pulsnewscast.blogspot.com";
let startIndex = 1;
const postsPerPage = 5;
let currentLabel = "";

function buildFeedUrl(label = "", start = 1) {
  const labelPart = label ? `/-/` + encodeURIComponent(label) : '';
  return `${blogUrl}/feeds/posts/default${labelPart}?alt=json&max-results=${postsPerPage}&start-index=${start}`;
}

function loadPosts(label = "") {
  currentLabel = label;
  startIndex = 1;
  document.getElementById("news-container").innerHTML = "<p>Loading news...</p>";
  fetchPosts(label, startIndex, true);
}

function loadMore() {
  startIndex += postsPerPage;
  fetchPosts(currentLabel, startIndex, false);
}

function fetchPosts(label, start, reset) {
  fetch(buildFeedUrl(label, start))
    .then(res => res.json())
    .then(data => {
      const entries = data.feed.entry || [];
      let html = "";

      if (reset && entries.length > 0) {
        const first = entries[0];
        const title = first.title.$t;
        const link = first.link.find(l => l.rel === "alternate").href;
        const img = first.media$thumbnail ? first.media$thumbnail.url : "https://via.placeholder.com/600x300";
        const date = new Date(first.published.$t).toDateString();
        const summary = first.summary?.$t.slice(0, 120) + "...";

        html += `
          <div class="featured-article">
            <a href="${link}" target="_blank">
              <img src="${img}" alt="${title}">
              <h2>${title}</h2>
            </a>
            <div class="date">🗓️ ${date}</div>
            <p>${summary}</p>
          </div>
          <div class="sub-articles">
        `;
        entries.shift();
      } else if (!reset) {
        html += `<div class="sub-articles">`;
      }

      entries.forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === "alternate").href;
        const img = entry.media$thumbnail ? entry.media$thumbnail.url : "https://via.placeholder.com/150";
        const date = new Date(entry.published.$t).toDateString();
        const summary = entry.summary?.$t.slice(0, 100) + "...";

        html += `
          <div class="sub-article">
            <a href="${link}" target="_blank">
              <img src="${img}" alt="${title}">
            </a>
            <div class="text">
              <p><a href="${link}" target="_blank"><strong>${title}</strong></a></p>
              <div class="date">🗓️ ${date}</div>
              <p>${summary}</p>
            </div>
          </div>
        `;
      });

      html += `</div>`;

      if (reset) {
        document.getElementById("news-container").innerHTML = html;
      } else {
        document.getElementById("news-container").innerHTML += html;
      }
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
      document.getElementById("news-container").innerHTML = "<p>Error loading news.</p>";
    });
}

// Initial load
window.addEventListener("DOMContentLoaded", () => loadPosts());
