const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/productModel");
const { responseReturn } = require("../../utiles/response");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

class productController {
  //   add_product = async (req, res) => {
  //     const { id } = req;
  //     const form = formidable({ multiples: true });

  //     form.parse(req, async (err, field, files) => {
  //       let {
  //         name,
  //         category,
  //         description,
  //         stock,
  //         price,
  //         discount,
  //         shopName,
  //         brand,
  //       } = field;
  //       const { images } = files;
  //       name = name.trim();
  //       const slug = name.split(" ").join("-");

  //       cloudinary.config({
  //         cloud_name: process.env.cloud_name,
  //         api_key: process.env.api_key,
  //         api_secret: process.env.api_secret,
  //         secure: true,
  //       });

  //       try {
  //         let allImageUrl = [];

  //         for (let i = 0; i < images.length; i++) {
  //           const result = await cloudinary.uploader.upload(images[i].filepath, {
  //             folder: "products",
  //           });
  //           allImageUrl = [...allImageUrl, result.url];
  //         }

  //         await productModel.create({
  //           sellerId: id,
  //           name,
  //           slug,
  //           shopName,
  //           category: category.trim(),
  //           description: description.trim(),
  //           stock: parseInt(stock),
  //           price: parseInt(price),
  //           discount: parseInt(discount),
  //           images: allImageUrl,
  //           brand: brand.trim(),
  //         });
  //         responseReturn(res, 201, { message: "product add success" });
  //       } catch (error) {
  //         responseReturn(res, 500, { error: error.message });
  //       }
  //     });
  //   };
  add_product = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 500, { error: err.message });
      }

      let {
        name,
        category,
        description,
        storageinfo,
        ingrediennts,
        stock,
        price,
        discount,
        shopName,
        brand,
        weight,
        unit,
        benefits, // Include benefits field
        questions, // Include questions field
      } = fields;

      const { images } = files;
      const videos = files.video
        ? Array.isArray(files.video)
          ? files.video
          : [files.video]
        : [];

      name = name.trim();
      const slug = name.split(" ").join("-");

      try {
        let allImageUrl = [];

        // Upload images
        if (images && images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(
              images[i].filepath,
              {
                folder: "products/images",
              }
            );
            allImageUrl.push(result.url);
          }
        }

        // Upload videos to Cloudinary
        let allVideoUrl = [];
        if (videos && videos.length > 0) {
          for (let i = 0; i < videos.length; i++) {
            try {
              console.log(`Uploading video: ${videos[i].filepath}`); // Debug: Log file path
              const result = await cloudinary.uploader.upload(
                videos[i].filepath,
                {
                  folder: "products/videos",
                  resource_type: "video",
                }
              );
              allVideoUrl.push(result.url);
            } catch (uploadErr) {
              console.error(
                `Error uploading video ${videos[i].filepath}:`,
                uploadErr
              ); // Log specific upload error
            }
          }
        }

        // Create product
        await productModel.create({
          sellerId: id,
          name,
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          storageinfo: storageinfo.trim(),
          ingrediennts: ingrediennts.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          videos: allVideoUrl,
          brand: brand.trim(),
          weight: parseInt(weight), // Ensure weight is an integer
          unit: unit.trim(), // Ensure unit is a string
          benefits: benefits,
          questions: questions,
        });

        responseReturn(res, 201, { message: "Product added successfully" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  product_get = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };
  product_update = async (req, res) => {
    let { name, description, discount, price, brand, productId, stock } =
      req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");
    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        price,
        brand,
        productId,
        stock,
        slug,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product, message: "product update success" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      const { productId, oldImage } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 404, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });
          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
          });

          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;

            await productModel.findByIdAndUpdate(productId, {
              images,
            });

            const product = await productModel.findById(productId);
            responseReturn(res, 200, {
              product,
              message: "product image update success",
            });
          } else {
            responseReturn(res, 404, { error: "image upload failed" });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };
}

module.exports = new productController();
