# Perspective Generator  

A simple and intuitive web tool for creating customizable perspective grids. Perfect for artists, illustrators, and designers, this tool lets you generate grids with ease and export them as **SVG** or **PNG** files for use in your projects.  

## Features  

- **Customizable Canvas**:  
  - Set the `width`, `height`, and `background color` of the grid area.  
  - Use transparent backgrounds for overlaying grids on other drawings.  
- **Flexible Perspective Control**:  
  - Adjust the positions of three perspective guide points.  
  - Define the number of perspective lines emanating from each guide point.  
  - Customize line colors, including transparent lines, for subtle overlays.  
- **Export Options**:  
  - Save your grid as an **SVG** (scalable and editable) or **PNG** (high-quality raster image).  
- **Responsive Design**:  
  - Works seamlessly on desktops, tablets, and mobile devices.  
- **Real-Time Updates**:  
  - Instantly see your grid as you adjust settings.  

## Screenshots  

![image](https://github.com/user-attachments/assets/06feafcd-61c2-4225-a9dd-70616cf11f9a)
![guidelines](https://github.com/user-attachments/assets/be464904-6129-4b6c-baec-2d4d8ac83f05)


## Who Is This For?  

This tool is designed for:  
- **Artists**: Create grids to guide perspective drawings.  
- **Designers**: Plan layouts and compositions with precision.  
- **Creatives**: Generate perspective templates for various projects.  

## Try It Out  

[Link to Live Demo](https://el-ahmed.github.io/Perspective-Generator/)  

## How to Use  

1. **Open the Tool**:  
   - Visit the application through the live demo link or run it locally (see instructions below).  

2. **Set Up Your Canvas**:  
   - Enter the desired `width` and `height`.  
   - Choose a `background color` (solid or transparent).  

3. **Adjust Perspective Points**:  
   - Manually set the `x` and `y` coordinates of the three guide points to control vanishing points.  

4. **Customize Grid Lines**:  
   - Select the number of lines radiating from each guide point.  
   - Choose line colors, including transparent options for subtle overlays.  

5. **Export Your Grid**:  
   - When satisfied with your grid, click the **Export** button.  
   - Choose between **SVG** (for scalable, editable graphics) or **PNG** (for rasterized images).  

6. **Use in Your Projects**:  
   - Import the exported file into your drawing or design software as a guide or overlay.  

## Why Use This Tool?  

- **Ease of Use**: No technical skills needed—adjust settings with a simple interface.  
- **Customizability**: Generate grids tailored to your specific needs.  
- **Export-Friendly**: Save your grid in multiple formats for versatile use.  
- **Portability**: Works on any device with a web browser.  

## Running Locally (Optional)  

If you want to run this tool offline or modify it, follow these steps:  

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/El-Ahmed/Perspective-Generator.git
   cd Perspective-Generator  
   ```  

2. **Install Dependencies**:  
   ```bash  
   yarn install  
   ```  

3. **Start the App**:  
   ```bash  
   yarn dev  
   ```  
   Open the URL displayed in your terminal in a web browser (usually `http://localhost:5173`).  

4. **Build for Production**:  
   To create a production build:  
   ```bash  
   yarn build  
   ```  
   The built files will be in the `dist` directory.  

## License  

This tool is free to use and open-source, licensed under the MIT License.  
