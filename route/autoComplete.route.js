const router = require("express").Router();

const autoCompleteController = require("../controller/autoComplete.controller");
const autoCompleteRepository = require("../repository/autoComplete.repository");

router.get("/", autoCompleteController.getIndex); // 전체조회
router.put("/searchCount", autoCompleteController.putSearchCount); // 클릭수증가
router.put("/satisfactionCount", autoCompleteController.putsatisfactionCount); // 만족수증가
router.put("/forceWeight", autoCompleteController.putForceWeight); // 가중치강제변경

router.put("/test", autoCompleteRepository.putweightAtTime); // 테스트

module.exports = router;
