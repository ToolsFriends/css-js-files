// Lazy Loading
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

// Cookie Functions
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Dark Mode
function darkMode() {
  let darkSwitch = document.getElementById('darkSwitch');
  let body = document.body;
  if(darkSwitch.checked) {
    setCookie('darkSwitch', 'true', 365);
    body.classList.add('dark');
  } else {
    setCookie('darkSwitch', 'false', 365);
    body.classList.remove('dark');
  }
}

if(getCookie('darkSwitch') === 'true') {
  document.getElementById('darkSwitch').checked = true;
  document.body.classList.add('dark');
}

// Pagination
var currentPage = 1;
var postPerPage = 6;

function pagination(posts) {
  var totalPosts = posts.length;
  var totalPages = Math.ceil(totalPosts / postPerPage);
  var startIndex = (currentPage - 1) * postPerPage;
  var endIndex = startIndex + postPerPage;
  
  document.querySelectorAll('.post-outer').forEach((post, index) => {
    if(index >= startIndex && index < endIndex) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
  
  document.getElementById('current-page').innerHTML = currentPage;
  document.getElementById('total-page').innerHTML = totalPages;
  
  document.getElementById('prev-page').disabled = (currentPage === 1);
  document.getElementById('next-page').disabled = (currentPage === totalPages);
}

function nextPage() {
  currentPage++;
  pagination(document.querySelectorAll('.post-outer'));
}

function prevPage() {
  currentPage--;
  pagination(document.querySelectorAll('.post-outer'));
}

document.addEventListener("DOMContentLoaded", function() {
  pagination(document.querySelectorAll('.post-outer'));
});

// Mega Menu Toggle
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.has-mega-menu').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
    });
  });
});
