const { createClient } = require("@supabase/supabase-js")
const supabaseKey = process.env.SUPABASEKEY
const supabaseUrl = process.env.SUPABASEURL

class SaintRepository {
  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }
  
  //adicionar tratamento de erro e testes
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
      .eq('id', saintId)

    return data
  }

}

module.exports = SaintRepository