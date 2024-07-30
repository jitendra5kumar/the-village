const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");

const communityController = require("../../controllers/dashboard/communityController");

router.post(
  "/community-add",
  authMiddleware,
  communityController.add_community
);

router.get("/communities", communityController.get_communities);

router.get("/community/:id", authMiddleware, communityController.get_community);

router.delete(
  "/community/:id",
  // authMiddleware,
  communityController.delete_community
);

module.exports = router;
