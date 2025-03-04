document.addEventListener("DOMContentLoaded", () => {
    let enable_border = document.getElementById("enable_border_chkb");
    let savedValue = localStorage.getItem('enable_border');
    if (savedValue !== null) {
        enable_border.checked = (savedValue === 'true');  
    }  
    enable_border.addEventListener("change", function() {

        localStorage.setItem('enable_border', enable_border.checked);
    });


    let clear_highscore_btn=document.getElementById("clear_highscore_btn");
    clear_highscore_btn.addEventListener("click",()=>{
        localStorage.removeItem("highscore");

    })



});