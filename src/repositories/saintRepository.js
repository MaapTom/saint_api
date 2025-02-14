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
        id, name, day, month, year, death, history, prayer,
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
        ),
        saint_image_desktop,
        saint_image_mobile,
        saint_image_avatar
      `)
      .eq('id', saintId)

    return data
  }

  async listSaintsBy(date, month) {
    const { data, error } = await this.supabase
      .from('saint')
      .select(`
          id, name, day, month, year, death, history, prayer,
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
          ),
          saint_image_desktop,
          saint_image_mobile,
          saint_image_avatar
        `)
      // Adicionar filtro para data e mês
     .eq('month', month)
     .eq('day', date);

    return data || []
  }

}

module.exports = SaintRepository