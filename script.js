function scrapeIssuuPage() {
	var wrapper = $('#wrapper'), container, errorTag;
	container = $('<div id="issuu" class="container"></div>');
	wrapper.html(container);
	errorTag = $('<div id="error"></div>');
	container.html(errorTag);

	var username = document.getElementById("username").value;

	if (!isUsernameValid(username)) {
	    errorTag.text('ERROR: A valid username has between 4 and 30 of only these characters: a-z 0-9 _ . -');
	} else {
		var url = 'http://search.issuu.com/' + username + '/docs/recent.rss'
		var request = $.ajax({
			type: 'GET',
			url: 'https://api.rss2json.com/v1/api.json?rss_url=' + url,
			dataType: 'jsonp',
			success: function(data) {
	    		if (data.items.length == 0) {
	    			errorTag.text('ERROR: Sorry, it looks like this ISSUU page doesn\'t have any issues at all!');
	    		} else {
	    			var latestIssue = data.items[0];
	    			var issueTitle = latestIssue.title;
		    		var issueURL = latestIssue.link;
		    		var coverImg = latestIssue.enclosure.link;

		    		container.html('<div id="latest-issue"><a href="' + issueURL + '"><img src="' +
		    						coverImg + '"><br>' + issueTitle + '</a></div>');
		    	}
	  		},
	  		error: function(data) {
	    		errorTag.text('ERROR: Sorry, it looks like the page you\'ve requested doesn\'t exist!');
	  		}
		});
	}
}

function isUsernameValid(username) {
	var usernamePattern = /^[a-z0-9\_\.\-]+$/;
	return (username.match(usernamePattern) && username.length >= 4 && username.length <= 30)
}