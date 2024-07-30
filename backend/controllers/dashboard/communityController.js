const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const community = require("../../models/communityModel");
const { responseReturn } = require("../../utiles/response");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

class communityController {
  // add_community = async (req, res) => {
  //   const { id } = req;
  //   const form = formidable({ multiples: true });

  //   form.parse(req, async (err, fields, files) => {
  //     if (err) {
  //       return responseReturn(res, 500, { error: err.message });
  //     }

  //     let {
  //       name,
  //       benefits, // Include benefits field
  //     } = fields;

  //     name = name.trim();
  //     const slug = name.split(" ").join("-");
  //     const { images } = files;
  //     console.log("kkkkkkkkkkkkk", images);
  //     try {
  //       let allImageUrl = [];

  //       // Upload images
  //       if (images && images.length > 0) {
  //         for (let i = 0; i < images.length; i++) {
  //           const result = await cloudinary.uploader.upload(
  //             images[i].filepath,
  //             {
  //               folder: "cludinary/images",
  //             },
  //             console.log("filepath", images[i].filepath)
  //           );
  //           allImageUrl.push(result.url);
  //         }
  //       }

  //       console.log("image", allImageUrl);

  //       // Upload videos to Cloudinary

  //       // Create product
  //       await community.create({
  //         sellerId: id,
  //         name,
  //         slug, // Ensure unit is a string
  //         images: allImageUrl,
  //         benefits: benefits,
  //       });

  //       responseReturn(res, 201, { message: "Community added successfully" });
  //     } catch (error) {
  //       responseReturn(res, 500, { error: error.message });
  //     }
  //   });
  // };

  add_community = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 500, { error: err.message });
      }

      let {
        name,
        benefits, // Include benefits field
      } = fields;

      name = name.trim();
      const slug = name.split(" ").join("-");
      const { image } = files; // Updated to handle single image
      console.log("Image file:", image);

      try {
        let imageUrl = "";

        // Upload image
        if (image) {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "community/images",
          });
          imageUrl = result.url;
        }

        console.log("Uploaded image URL:", imageUrl);

        // Create community
        await community.create({
          sellerId: id,
          name,
          slug,
          image: imageUrl, // Store single image URL
          benefits: benefits,
        });

        responseReturn(res, 201, { message: "Community added successfully" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  // Get all communities
  get_communities = async (req, res) => {
    try {
      const communities = await community.find({});
      responseReturn(res, 200, { communities });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  get_community = async (req, res) => {
    const { id } = req.params;
    try {
      const communityData = await community.findById(id);
      if (!communityData) {
        return responseReturn(res, 404, { error: "Community not found" });
      }
      responseReturn(res, 200, { community: communityData });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  delete_community = async (req, res) => {
    const { id } = req.params;
    try {
      const communityData = await community.findByIdAndDelete(id);
      if (!communityData) {
        return responseReturn(res, 404, { error: "Community not found" });
      }
      responseReturn(res, 200, { message: "Community deleted successfully" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new communityController();
