// configure instagram app with your access_token
const access_token = 'IGQVJXSkFINFRQWUdDM1hJeTJIMjFkZAVlHVGJYYVYwSGJ3NmNJUUJsa0ZA5ZATlVbUpnSnBWNEZAGQUJDQ2tUbUtlYWFZAdnh4bEw3TXhzaGNOdDdtZAmV4MEZAtMVlmb3E1ZAUlMcXcwX2xISXd1OXM4eUlwTwZDZD';
const client_id = '1093703538121680';
const graph_url = 'https://graph.instagram.com/';
var oneMedia = [];

const cargarUrls = urls => {

    let item = `
        <section class="post-column">
            <div class="post-row">
                <img class="uno" src="${urls[0].media_url}" loading="lazy" alt="">
                <img class="dos" src="${urls[1].media_url}" loading="lazy" alt="">
            </div>

            <img class="grande" src="${urls[2].media_url}" loading="lazy" alt="">
            <img class="grande" src="${urls[3].media_url}" loading="lazy" alt="">
            <div class="post-row second">
                <img src="${urls[4].media_url}" loading="lazy" alt="">
                <img src="${urls[5].media_url}" loading="lazy" alt="">
            </div>
            <div class="post-column last-column">
                <img src="${urls[6].media_url}" loading="lazy" alt="">
                <img src="${urls[7].media_url}" loading="lazy" alt="">
                <img src="${urls[8].media_url}" loading="lazy" alt="">
            </div>
        </section> `;

    document.getElementById('galery').innerHTML = item;

};

const getUrls = async (ids) => {
    try {

        var data = [];
        let fields2 = 'media_url';

        for (let i = 0; i < 9; i++)  {
  
            let response2 = await fetch(`${graph_url}${ids[i].id}?fields=${fields2}&access_token=${access_token}`)
            let result2 = await response2.json();
            
            data.push(result2)
        }

        cargarUrls(data)


    } catch (error) {
        console.log(error)
    }
}

const getIds = async () => {

    try {
        let fields = 'id,caption';

        let response = await fetch(`${graph_url}me/media?fields=${fields}&access_token=${access_token}`)
        let result = await response.json()

        getUrls(result.data)

    } catch (e) {
        console.log(e)
    }

}

getIds()