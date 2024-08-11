const SaintService = require("../services/saintService.js")
const SaintRepository = require("../repositories/saintRepository.js")

const generateInstance = () => {
  const saintRepository = new SaintRepository()
  const saintService = new SaintService({ saintRepository })

  return saintService
}

module.exports.generateInstance = generateInstance