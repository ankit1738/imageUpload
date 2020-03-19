Assignment for Insider.
Image cropping and uploading from scratch.

Functional Spec 

    The application crops down the selected image to four specified dimensions.

    User can upload all four images or can select a paticular image to upload.

    After selecting an image user is given the choice of uplading the images.

    Uploaded images are then displayed on the next page.

    Image of dimensions 1024x1024 can be uploaded only.
    
Technical Spec
    
    The application used canvas tag to redraw the image selected into different dimensions.
    The image is not streched but cropped from (0,0) i.e. Upper Left corner of the Image.
    This coordinate can be changed and Image can be cropped from the middle if one wants.
    
    From frontend the images are converted to base64  format and send to server where it is then saved as an image file in the root/uploads directory.
    To retrieve the image, First the image is read and converted to base64 format and sent to server where it is renderd inside n img tag
    

INSTRUCTION TO RUN

    1. Clone the project

    2. Install the dependencies 

        open cmd inside backend folder and run "npm install"
        and inside imageUpload folder and run "npm install"

    3. Run the application
        Open cmd inside backend folder and run "npm start"
