document.addEventListener('DOMContentLoaded', (event) => {
    const storyPages = document.querySelectorAll('.story-page');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const speakBtn = document.getElementById('play-btn');
    const firstPageBtn = document.getElementById('first-page-btn');
    const body = document.body;

    let currentPageIndex = 0;
    
    const speech = new SpeechSynthesisUtterance();

    function speakText() {
        window.speechSynthesis.cancel();
        
        const currentPage = storyPages[currentPageIndex];
        
        let textToRead = '';
        if (currentPageIndex === 0) {
            const titleElement = currentPage.querySelector('.title');
            const authorElement = currentPage.querySelector('.author');
            if (titleElement) textToRead += titleElement.textContent + '. ';
            if (authorElement) textToRead += authorElement.textContent;
        } else {
            const pElement = currentPage.querySelector('p');
            if (pElement) textToRead = pElement.textContent;
        }

        if (textToRead) {
            speech.text = textToRead;
            window.speechSynthesis.speak(speech);
        }
    }

    function showPage(index) {
        if (index < 0 || index >= storyPages.length) {
            return;
        }

        window.speechSynthesis.cancel();

        storyPages.forEach(page => {
            page.classList.remove('active-page');
        });
        storyPages[index].classList.add('active-page');
        
        currentPageIndex = index;
        
        // Update page number logic to exclude cover and end pages
        const pageNumberElement = storyPages[index].querySelector('.page-number');
        if (pageNumberElement) {
            // Check if the current page is the cover (index 0) or the end (last index)
            if (currentPageIndex === 0 || currentPageIndex === storyPages.length - 1) {
                pageNumberElement.textContent = ''; // Hide page number on these pages
            } else {
                // Calculate the true page number by subtracting the cover page
                const truePageNumber = currentPageIndex;
                const totalPages = storyPages.length - 2; // Subtract cover and end pages
                pageNumberElement.textContent = `Page ${truePageNumber} of ${totalPages}`;
            }
        }

        updateButtons();
        speakText();
    }

    function updateButtons() {
        prevBtn.disabled = currentPageIndex === 0;

        if (currentPageIndex === storyPages.length - 1) {
            nextBtn.style.display = 'none';
            firstPageBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            firstPageBtn.style.display = 'none';
        }
    }

    nextBtn.addEventListener('click', () => {
        showPage(currentPageIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        showPage(currentPageIndex - 1);
    });

    firstPageBtn.addEventListener('click', () => {
        showPage(0);
        currentPageIndex = 0;
    });

    showPage(currentPageIndex);
});