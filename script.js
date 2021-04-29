$(document).ready(function () {
    let API_KEY = "AIzaSyCjcDZhSq-PuhkztilnXPn_U5666JC00bs"

    $("#form").submit(function (event) {
        event.preventDefault()

        let searchRequest = $("#searchRequest").val()
        let maxResults = $("#maxResults").val()
        if (maxResults === "") {
            maxResults = 9
        }
        let orderBy = $("#orderBy option:selected").val()
        console.log(orderBy)

        videoSearch(API_KEY, searchRequest, maxResults, orderBy)
    })

    function videoSearch(API_KEY, searchQuery, maxResults, orderBy) {
        $("#videos").empty()

        $.get("https://youtube.googleapis.com/youtube/v3/search?" +
            "key=" + API_KEY +
            "&part=snippet" +
            "&type=video" +
            "&order=" + orderBy +
            "&maxResults=" + maxResults +
            "&q=" + searchQuery, function (data) {
            console.log(data)

            data.items.forEach(item => {
                let videoId = item.id.videoId
                let video =
                    '<iframe width="370" height="210" ' +
                    'src="https://www.youtube.com/embed/' + videoId + '" ' +
                    'frameborder="0" allowfullscreen>' +
                    '</iframe>'
                $("#videos").append(video)
            })
        })
    }
})