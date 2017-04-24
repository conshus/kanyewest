//modified code from http://codepen.io/ahmady09/pen/PNejyN
console.log('quotes.js')
var quoteArray = []
counter = 1;

//getQuotesForSection = function(pageId, sectionIndex, success, error) {
getQuotesForSection = function(sectionIndex, success, error) {
        $.get({
            url: "https://en.wikiquote.org/w/api.php",
            dataType: "jsonp",
            data: {
                format: "json",
                action: "parse",
                noimages: "",
                pageid: 4649,
                section: sectionIndex
            },

            success: function(result, status){
                var quotes = result.parse.text["*"];
                // var quoteArray = []

                // Find top level <li> only
                var $lis = $(quotes).find('li:not(li li)');
                $lis.each(function() {
                    // Remove all children that aren't <b>
                    $(this).children().remove(':not(b)');
                    var $bolds = $(this).find('b');
                    quoteArray.push($(this).html());
                    // If the section has bold text, use it.  Otherwise pull the plain text.
                    // if($bolds.length > 0) {
                    //     quoteArray.push($bolds.html());
                    // } else {
                    //     quoteArray.push($(this).html());
                    // }
                });
                //success({ titles: result.parse.title, quotes: quoteArray });
              //console.log(quoteArray)
              counter++;
              if (counter < 16)
              {
                getQuotesForSection(counter);
              } else{
                $("#kanyeQuote").html("<p>"+quoteArray[Math.floor(Math.random() * (quoteArray.length))]+"</p>");
                console.log( quoteArray[Math.floor(Math.random() * (quoteArray.length))] );
                $( "#kanyeSpeechBubble" ).fadeIn("slow");

              }
            },
            error: function(xhr, result, status){
                error("Error getting quotes");
            }
        });
        };
        //for (i=1; i<3; i++){
          getQuotesForSection(counter);
        //}
