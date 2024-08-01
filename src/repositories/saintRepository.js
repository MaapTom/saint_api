import { createClient } from "@supabase/supabase-js"

const supabaseKey = process.env.SUPABASEKEY
const supabaseUrl = process.env.SUPABASEURL

export class SaintRepository {
  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  async getSaint(saintId) {
    const { data, error } = await this.supabase
      .from('saint')
      .select(`
        id, day, month, year, death, history, prayer,
        saint_category(
          category(
            name
          )
        ),
        saint_source(
          source(
            name,
            link
          )
        )
      `)
      .eq('id', 1)

    return data
  }

}

// const saintRepository = new SaintRepository()
// const data = await saintRepository.getSaint(1)