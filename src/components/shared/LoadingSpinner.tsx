// src/components/shared/LoadingSpinner.tsx

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

// src/components/layout/Footer.tsx

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            České okamžité platby: Příběh úspěchu
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Analýza založená na oficiálních datech České národní banky. 
            Vytvořeno pro demonstraci růstu fintech inovací v České republice.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div>Data: ČNB CERTIS statistiky</div>
            <div>•</div>
            <div>Období: 2008-2025</div>
            <div>•</div>
            <div>Vytvořeno: {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}