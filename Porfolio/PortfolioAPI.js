

document.addEventListener('DOMContentLoaded', function() {
  // Check if we have cached data that's still fresh
  const cachedData = getCachedNASAData();
  if (cachedData && isDataFresh(cachedData.date)) {
    updateNASAElements(cachedData);
    return; // Use cached data and exit
  }

  // If no fresh cache, fetch new data
  fetchNASAPicture();
});

async function fetchNASAPicture() {
  try {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=x91iRViruWAP9lQ01aRj3E8ScashuSj64Q7Y2sEs&thumbs=true');
    const data = await response.json();
    
    // Validate API response
    if (!data.url || !data.title) {
      throw new Error('Invalid NASA API response');
    }
    
    // Cache the new data with timestamp
    cacheNASAData(data);
    
    // Update the DOM
    updateNASAElements(data);
    
  } catch (error) {
    console.error("NASA API Error:", error);
    showNASAError();
  }
}

// Helper Functions

function updateNASAElements(data) {
  const imgElement = document.getElementById('nasa-image');
  const titleElement = document.getElementById('nasa-image-title');
  const descElement = document.getElementById('nasa-image-explanation');
  const linkElement = document.getElementById('nasa-image-link');
  
  // Handle video thumbnails (APOD sometimes returns videos)
  imgElement.src = data.thumbnail_url || data.url;
  imgElement.alt = data.title;
  
  titleElement.textContent = data.title;
  descElement.textContent = truncateText(data.explanation, 200);
  linkElement.href = data.hdurl || data.url;
  
  // Show the section (in case it was hidden from previous error)
  document.querySelector('.nasa-section').style.display = 'block';
}

function getCachedNASAData() {
  const cached = localStorage.getItem('nasaAPODCache');
  return cached ? JSON.parse(cached) : null;
}

function cacheNASAData(data) {
  const cacheData = {
    ...data,
    cachedAt: new Date().toISOString()
  };
  localStorage.setItem('nasaAPODCache', JSON.stringify(cacheData));
}

function isDataFresh(dateString) {
  const cachedDate = new Date(dateString);
  const now = new Date();
  const hoursDiff = (now - cachedDate) / (1000 * 60 * 60);
  return hoursDiff < 24; // Consider fresh if < 24 hours old
}

function truncateText(text, maxLength) {
  return text.length > maxLength 
    ? text.substring(0, maxLength) + '...' 
    : text;
}

function showNASAError() {
  const nasaSection = document.querySelector('.nasa-section');
  nasaSection.innerHTML = `
    <div class="nasa-error">
      <p><i class="fas fa-satellite-dish"></i> Connection to NASA failed</p>
      <button onclick="window.location.reload()" class="cyber-button">
        <i class="fas fa-sync-alt"></i> Retry
      </button>
    </div>
  `;
  nasaSection.style.display = 'block';
}