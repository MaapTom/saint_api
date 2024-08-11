class SaintService {
  constructor({ saintRepository }) {
    this.saintRepository = saintRepository
  }

  async getSaint(saintId) {
    if (saintId === undefined)
      throw new Error("Saint ID is missing");
    
    const saint = await this.saintRepository.getSaint(saintId)

    return saint[0]
  }
}

module.exports = SaintService