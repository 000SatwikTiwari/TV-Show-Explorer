 let hash = new Map();

        document.querySelector(".bar").addEventListener("input", async () => {
            if (document.querySelector(".suggestion")) {
                document.querySelector(".suggestion").remove();
            }
            document.querySelector(".search").insertAdjacentHTML("beforeend", `<div class="suggestion">
        <div class="list"></div>
    </div>`)

            //Yaha pe input nikal ke API call kr sakte and array bana ke suggestion list me nam dal sakte 
            try {
                let inp = document.querySelector(".bar").value.trim();

                //https://api.tvmaze.com/search/shows?q=${encodeURIComponent(input)}
                let data = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(inp)}`);
                let obj = await data.json();

                //now extract the name from returned object
                let arr = [];
                for (let x of obj) {
                    arr.push(x.show.name);
                }
                //now push these names into the list using loop

                for (let x of arr) {
                    document.querySelector(".list").insertAdjacentHTML("beforeend", `<div class="i"><div id="i">${x}</div></div>`)
                }
                ///

                //if enter clicked then by writing:
  
                document.querySelector(".bar").addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {

                        if (document.querySelector(".bar").value == "") {
                            document.querySelector(".grid").innerHTML = "";
                        }
                        //remove suggestion:


                        if (document.querySelector(".suggestion")) {
                            document.querySelector(".suggestion").remove();
                        }


                        for (let x of obj) {

                            ///for show descpn:
                            hash.set(x.show.name, x.show.summary);
                            /////


                            //ek ek add kro object line se:
                            //forgenerfbb:

                            let s = "";
                            for (let y of x.show.genres) {
                                s += y + ", "
                            }
                            //
                            if (document.querySelector(".bar").value == "") {
                            document.querySelector(".grid").innerHTML = "";
                        }
                            document.querySelector(".grid").insertAdjacentHTML("afterbegin", `<div class="card">
        <div class="img"><img id="img" src="${x.show.image.medium}" alt=""></div>
        <div class="detail">
           
            <div class="name d">Name : ${x.show.name}</div>
            <div class="type d">Type : ${x.show.type}</div>
            <div class="duration d">Duration : ${x.show.runtime} min</div>
            <div class="gene d">
             Genere: ${s}
            </div>
            <div class="lang d">Language : ${x.show.language} </div>
            <div class="pre d">Premeired : ${x.show.premiered}</div>
            <div class="end d">Ended : ${x.show.ended}</div>
            <div class="ratting d">Rating : ${x.show.rating?.average ?? "Not Rated"}/10
        </div>
        <div class="des d">Show description</div>
    </div>`);



                        }




                    }





                });





                ///if any list item is clicked then :
                if (document.querySelector(".suggestion")) {

                    document.querySelector(".suggestion").addEventListener("click", async (event) => {
                        let item = event.target.closest(".i");

                        //assign .bar to that value:
                        document.querySelector(".bar").value = item.innerText;
                        //remove suggestion box then:
                        if (document.querySelector(".suggestion")) {
                            document.querySelector(".suggestion").remove();
                        }


                        //fetch the results and add it in screen

                        //we have obj we can use that :
                        document.querySelector(".grid").innerHTML = "";

                        for (let x of obj) {
                            //ek ek add kro object line se:
                            //forgenerfbb:
                            let s = "";
                            for (let y of x.show.genres) {
                                s += y + ", "
                            }
                            //


if (document.querySelector(".bar").value == "") {
                            document.querySelector(".grid").innerHTML = "";
                        }

                            document.querySelector(".grid").insertAdjacentHTML("afterbegin", `<div class="card">
        <div class="img"><img id="img" src="${x.show.image.medium}" alt=""></div>
        <div class="detail">
           
            <div class="name d">Name : ${x.show.name}</div>
            <div class="type d">Type : ${x.show.type}</div>
            <div class="duration d">Duration : ${x.show.runtime} min</div>
            <div class="gene d">
             Genere: ${s}
            </div>
            <div class="lang d">Language : ${x.show.language} </div>
            <div class="pre d">Premeired : ${x.show.premiered}</div>
            <div class="end d">Ended : ${x.show.ended}</div>
            <div class="ratting d">Rating : ${x.show.rating?.average ?? "Not Rated"}/10
        </div>
        <div class="des d">Show description</div>
    </div>`);



                        }



                    })

                }



            }
            catch (e) {

                console.log(e);
            }
            ////


            //want to click anywhere to close it any how

            document.body.addEventListener("click", (e) => {
                if (e.target != document.querySelector(".item"))
                    document.querySelector(".suggestion").remove();
            })

            // Open description
            document.querySelector(".grid").addEventListener("click", (event) => {

                let des = event.target.closest(".des");

                if (!des) return;

                let card = des.closest(".card");
                let name = card.querySelector(".name").innerText.replace("Name : ", "");

                // Remove previous popup
                document.querySelector(".about")?.remove();
               
if (document.querySelector(".bar").value == "") {
                            document.querySelector(".grid").innerHTML = "";
                        }

                document.body.insertAdjacentHTML("beforeend", `
        <div class="about">
            <button id="cut"><img src="cut.svg" alt=""></button>
            ${hash.get(name) || "Description not available"}
        </div>
    `);
            });

            // Close description
            document.body.addEventListener("click", (event) => {
                if (event.target.closest("#cut")) {
                    document.querySelector(".about")?.remove();
                }
            });

        })
 
