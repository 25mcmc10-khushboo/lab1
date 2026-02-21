let booksJSON = [];

$(document).ready(function(){

    $.ajax({
        url: "task8.xml",
        type: "GET",
        dataType: "xml",

        success: function(xml){

            $(xml).find("book").each(function(){

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    pubdate: $(this).find("publish_date").text().trim()
                };

                booksJSON.push(book);
            });

            populateFilters();
            displayTable(booksJSON);
        },

        error:function(){
            alert("Error loading XML file");
        }
    });

    $("#genreFilter, #authorFilter, #minPrice, #maxPrice")
        .on("change keyup", function(){
            applyFilters();
        });

});
function populateFilters(){

    let genres = new Set();
    let authors = new Set();

    booksJSON.forEach(b=>{
        genres.add(b.genre);
        authors.add(b.author);
    });

    genres.forEach(g=>{
        $("#genreFilter").append(`<option value="${g}">${g}</option>`);
    });

    authors.forEach(a=>{
        $("#authorFilter").append(`<option value="${a}">${a}</option>`);
    });
}

function applyFilters(){

    let genre = $("#genreFilter").val();
    let author = $("#authorFilter").val();
    let min = $("#minPrice").val();
    let max = $("#maxPrice").val();

    let filtered = booksJSON.filter(book=>{

        if(genre!="all" && book.genre!=genre) return false;
        if(author!="all" && book.author!=author) return false;
        if(min && book.price < min) return false;
        if(max && book.price > max) return false;

        return true;
    });

    displayTable(filtered);
}


function displayTable(data){

    let tbody = $("#bookTable tbody");
    tbody.empty();

    if(data.length==0){
        tbody.append("<tr><td colspan='5'>No books found</td></tr>");
        return;
    }

    data.forEach(b=>{
        tbody.append(`
            <tr>
                <td>${b.title}</td>
                <td>${b.author}</td>
                <td>${b.genre}</td>
                <td>${b.price}</td>
                <td>${b.pubdate}</td>
            </tr>
        `);
    });
}