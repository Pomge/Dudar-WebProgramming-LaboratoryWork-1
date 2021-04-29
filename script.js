$(document).ready(function () {
    let API_KEY = "AIzaSyDQRiqO5is72nsTWToxQFViEPROBkL1TDY"

    $("#form").submit(function (event) {
        event.preventDefault()

        let searchRequest = $("#searchRequest").val()
        let maxResults = $("#maxResults").val()
        if (maxResults === "") {
            maxResults = 9
        }
        let showStatistics = $("#showStatistics")[0].checked

        videoSearch(API_KEY, searchRequest, maxResults, showStatistics)
    })

    function videoSearch(API_KEY, searchQuery, maxResults, showStatistics) {
        $("#videos").empty()

        let getQuery
        if (showStatistics) {
            getQuery = "&part=snippet&part=statistics"
        } else getQuery = "&part=snippet"

        $.get("https://youtube.googleapis.com/youtube/v3/search?" +
            "key=" + API_KEY +
            getQuery +
            "&type=video" +
            "&maxResults=" + maxResults +
            "&q=" + searchQuery, function (data) {
            console.log(data)

            data.items.forEach(item => {
                let videoId = item.id.videoId
                let video =
                    '<div>' +
                    '<iframe width="370" height="210" ' +
                    'src="https://www.youtube.com/embed/' + videoId + '" ' +
                    'frameborder="0" allowfullscreen>' +
                    '</iframe>' +
                    '<p></p>'
                    '</div>'
                $("#videos").append(video)
            })
        })
    }
})