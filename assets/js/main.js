/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// Fetch the episodes data from the Spotify API
fetch('https://api.spotify.com/v1/shows/1GJZ8b6Dqwed3ujcp0xPmr/episodes?offset=0&limit=50&market=ZA')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data.items)) {
      const episodes = data.items;

      // Iterate over each episode and populate the template
      episodes.forEach(episode => {
        // Create a new article element
        const article = document.createElement('article');
        article.classList.add('mini-post');

        // Create elements for header content
        const header = document.createElement('header');
        const heading = document.createElement('h3');
        const time = document.createElement('time');
        const authorLink = document.createElement('a');
        const authorImage = document.createElement('img');
        const description = document.createElement('p');

        // Populate the header content using the episode data
        heading.textContent = episode.name;
        time.classList.add('published');
        time.setAttribute('datetime', episode.release_date);
        time.textContent = episode.release_date;
        authorLink.classList.add('author');
        authorImage.src = 'images/quaide.jpg';
        authorImage.alt = '';
        description.textContent = episode.description;

        // Append the header content to the header element
        header.appendChild(heading);
        header.appendChild(time);
        authorLink.appendChild(authorImage);
        header.appendChild(authorLink);
        header.appendChild(description);

        // Append the header element to the article
        article.appendChild(header);

        // Create an anchor element for the image
        const imageLink = document.createElement('a');
        imageLink.classList.add('image');
        imageLink.href = 'single.html';

        // Create an image element
        const image = document.createElement('img');
        image.src = 'images/music.jpg';
        image.alt = '';

        // Append the image to the image anchor element
        imageLink.appendChild(image);

        // Append the image anchor element to the article
        article.appendChild(imageLink);

        // Append the populated article to the desired container on your website
        const container = document.getElementById('mini-posts');
        container.appendChild(article);
      });
    } else {
      console.log('Error: Invalid data format or missing items property.');
    }
  })
  .catch(error => {
    console.log('Error fetching episodes:', error);
  });





(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});

})(jQuery);