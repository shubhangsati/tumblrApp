document.getElementById('searchButton').addEventListener('click', getTaggedPost);
document.forms[0].addEventListener('submit', getTaggedPost);
function getTaggedPost() {
    event.preventDefault();
    let searchInput = document.getElementById('searchInputField').value;
    console.log(`Searching for ${searchInput}`);
    $.getJSON(`/search/${searchInput}`, (response) => {
        $('#results').empty();
        const content = response.response;
        content.forEach(element => {
            console.log(element);
            // console.log(element.description);
        });
        if (content.length == 0)
            $('#results').append('<h4 class="alert alert-danger"> No results found :( </h4>');
        else {
            for (var i = 0; i < content.length; ++i) {
                const postItem = content[i];
                $('#results').append(`
                <div class="row postBlock" style="background: #F8F8F8; margin-bottom: 1em; border-radius:0 5px 5px 0;">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-12">
                                <h6>
                                    <a href="/blog/${postItem.blog_name}">${postItem.blog_name}</a> ${postItem.answer == undefined ? 'posted' : 'answered' } on ${postItem.date} 
                                    <a href="${postItem.post_url}"><i class="fa fa-external-link-alt"></i></a>
                                </h6>
                            </div<
                        </div>
                        <div class="row">
                            ${ postItem.photos == undefined ? `<div class="col-lg-12">` : `
                                    <div class='col-lg-4'>
                                        <a href='${postItem.photos[0].original_size.url}'><img src='${postItem.photos[0].original_size.url}' style='width:100%; max-width:100%;'></a>
                                    </div>
                                    <div class="col-lg-8">
                                ` 
                            }
                                ${postItem.answer == undefined ? `
                                <h5>${postItem.caption == undefined ? ' ' : postItem.caption}</h5>
                                <h5>${postItem.title == undefined ? '' : postItem.title}</h5>
                                <h5>${postItem.body == undefined ? ' ' : postItem.body}</h5>` : `<h5>${postItem.answer}</h5>`}
                            </div>
                        </div>
                    </div>
                </div>
                `);
            }
        }
    });
}