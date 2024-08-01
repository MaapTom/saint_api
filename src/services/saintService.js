export class SaintService {
  constructor({ saintRepository }) {
    this.saintRepository = saintRepository
  }

  async getSaint(saintId) {
    const saint = await this.saintRepository.getSaint(saintId)

    return saint[0]
  }
}

