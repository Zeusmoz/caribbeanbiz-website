
import { useTranslation } from '../contexts/LanguageContext'

const COMPANY_HREFS = ['#about', '#acquisition', '#', '#', '#']

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-cream/10 bg-charcoal-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-6 flex items-center overflow-hidden" style={{ height: '48px' }}>
              <img
                src="/assets/CaribbeanBiz%20Logo-02.png"
                alt="CaribbeanBiz"
                style={{ height: '200px', width: 'auto', flexShrink: 0 }}
              />
            </div>
            <p className="text-cream/50 max-w-sm mb-6">
              {t.about.heading}
            </p>
            <div className="flex space-x-4">
              {/* Twitter */}
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-cream/60 hover:text-burgundy hover:border-burgundy/50 transition-all"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-cream/60 hover:text-burgundy hover:border-burgundy/50 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/17867743478"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-cream/60 hover:text-burgundy hover:border-burgundy/50 transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-cream mb-4">{t.footer.servicesTitle}</h4>
            <ul className="space-y-3 text-cream/50">
              {t.footer.serviceLinks.map((link) => (
                <li key={link}>
                  <a href="#services" className="hover:text-burgundy transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-cream mb-4">{t.footer.companyTitle}</h4>
            <ul className="space-y-3 text-cream/50">
              {t.footer.companyLinks.map((label, idx) => (
                <li key={label}>
                  <a href={COMPANY_HREFS[idx]} className="hover:text-burgundy transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/40 text-sm mb-4 md:mb-0">
            {t.footer.copyright}
          </p>
          <div className="flex space-x-6 text-sm text-cream/40">
            <a href="#" className="hover:text-burgundy transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-burgundy transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer >
  )
}
