// import 'regenerator-runtime from ./runtime'

// Get the firstmodal
var modal = document.getElementById("firstModal");

//get the second modal
var modal1 = document.getElementById("secondModal");


// Get the button that opens the modal
var abtn = document.getElementById("addbtn");

//get the button that open 2nd modal
var vbtn = document.getElementById("viewbtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//Get the <span> element that closes the second modal
var span2 = document.getElementsByClassName("close-1")[0];

// When the user clicks add expense button, open the first modal
abtn.onclick = function () {
    modal.style.display = "block";
}

//When the user clicks view expense button, open the second modal
vbtn.onclick = function () {
    modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

span2.onclick = function () {
    modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//for modal-1
window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

// var clear = document.getElementById("clr");

// clear.onclick = function () {
//     var ele = document.getElementById("date");
//     for (var i = 0; i < ele.length; i++) {
//         date[i].value = '';
//     }
//     var ele = document.getElementById("amount");
//     for (var i = 0; i < ele.length; i++) {
//         amount[i].value = '';
//     }
//     var ele = document.getElementById("desc");
//     for (var i = 0; i < ele.length; i++) {
//         desc[i].value = '';
//     }
// }




// import regenerator-runtime

const { BlobServiceClient } = require('@azure/storage-blob');

// const attachment = document.getElementById('upload');
const fileInput = document.getElementById('file-input');

const blobSasUrl = 'https://demostorage25.blob.core.windows.net/?sv=2021-06-08&ss=b&srt=co&sp=rwdlaciytf&se=2022-09-09T01:49:42Z&st=2022-09-08T17:49:42Z&spr=https&sig=fRlF3ub0SlvkJ6nVyZQu0%2FOCaELAKyvx1y5pF5WXySA%3D';
const blobServiceClient = new BlobServiceClient(blobSasUrl);

const containerName = 'demo';
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadFiles = async () => {

    try {
        const promises = [];
        for (const file of fileInput.files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
            // console.log({...file,name:file.name+date.value.toString()});
        }
        await Promise.all(promises);
        alert('Uploaded to Blob Storage');
    }
    catch (error) {
        alert(error.message);
    }
}

// attachement.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', uploadFiles);
