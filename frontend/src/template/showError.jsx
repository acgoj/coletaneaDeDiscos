export default (error) => { 
    if (error.response) {
        alert(error.response.data.message)
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    console.log(error.config);
}