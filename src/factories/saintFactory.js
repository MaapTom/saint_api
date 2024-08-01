import { SaintService } from "../services/saintService.js"
import { SaintRepository } from "../repositories/saintRepository.js"

export const generateInstance = () => {
  const saintRepository = new SaintRepository()
  const saintService = new SaintService({ saintRepository })

  return saintService
}
