import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

interface NotificationData {
  enabled: boolean;
  contact: string;
}

interface AddressData {
  name: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
}

interface RecipientData extends AddressData {
  country: string;
}

interface FormData {
  trackingNumber: string;
  sender: AddressData;
  recipient: RecipientData;
  senderNotification: NotificationData;
  recipientNotification: NotificationData;
  options: {
    deliveryConfirmation: boolean;
    priority: boolean;
    size: 'S' | 'M' | 'L';
  };
}

const formStyles = `
  /* Form styles for both print and screen */
  .form-container {
    border: 1px solid #000;
    padding: 20px;
    width: 148mm;
    margin: 0 auto;
    background-color: white;
    position: relative;
  }

  .tracking-number-line {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dotted-line {
    flex-grow: 1;
    border-bottom: 1px dotted #000;
    height: 1.5em;
    min-width: 100px;
    display: inline-block;
  }

  .notification-section {
    margin: 2em 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .measurement-box {
    display: inline-block;
    border-bottom: 1px dotted #000;
    width: 30px;
    height: 1.5em;
    text-align: center;
    margin: 0 5px;
  }

  .stamp-circle {
    width: 60px;
    height: 60px;
    border: 1px solid #000;
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    right: 40px;
    margin: 25px 0;
  }

  .checkbox {
    border: 1px solid #000;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 5px;
    position: relative;
  }

  .checkbox.checked::after {
    content: "X";
    position: absolute;
    top: -4px;
    left: 1px;
    font-size: 12px;
  }

  .logo {
    text-align: right;
    margin-bottom: 10px;
  }

  .logo img {
    height: 40px;
  }

  @media print {
    .logo img {
      filter: brightness(0);
    }
  }

  .notification-box {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px 0;
  }

  .notification-box .notification-section {
    margin: 0.5em 0;
  }

  .postal-details {
    display: flex;
    gap: 10px;
    margin: 5px 0;
  }

  .postal-details > div {
    flex: 1;
  }

  .postal-details > div:last-child {
    flex: 2;
  }

  .country-field {
    width: 50%;
  }

  .postal-label {
    font-size: 8px;
    color: #666;
    margin-top: 2px;
  }

  .bold {
    font-weight: bold;
  }

  .form-title {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .form-row {
    margin-bottom: 10px;
  }

  .section-title {
    font-weight: bold;
  }

  .form-field {
    border-bottom: 1px dotted #000;
    min-height: 18px;
    margin: 5px 0;
  }

  .postal-code {
    letter-spacing: 1px;
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    position: relative;
  }

  .bottom-row > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .footer {
    font-size: 8px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    height: 30px;
    width: auto;
  }

  .print-only {
    display: none;
  }

  /* Print-specific styles */
  @media print {
    body {
      background-color: white;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .form-container {
      box-shadow: none;
      font-family: Arial, sans-serif;
    }
    .print-only {
      display: block;
    }
    @page {
      size: A4 portrait;
      margin: 0;
    }
    .form-container {
      margin: 20mm auto;
    }
  }
`;

const PostalFormApp = () => {
  const [formData, setFormData] = useState<FormData>({
    trackingNumber: '',
    sender: {
      name: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      city: '',
    },
    recipient: {
      name: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      city: '',
      country: '',
    },
    senderNotification: {
      enabled: false,
      contact: '',
    },
    recipientNotification: {
      enabled: false,
      contact: '',
    },
    options: {
      deliveryConfirmation: false,
      priority: false,
      size: 'M', // S, M, or L
    },

  });

  const handleChange = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' ? {
        ...prev[section] as object,
        [field]: value
      } : value
    }));
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-form');
    if (!printContent) return;

    const windowUrl = 'about:blank';
    const uniqueName = new Date().getTime();
    const windowName = 'Print' + uniqueName;
    const printWindow = window.open(windowUrl, windowName, 'left=200,top=200,width=800,height=600');
    if (!printWindow) return;
    
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>' + formStyles + '</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    
    // Delay print to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Generator Potwierdzenia Nadania Poczty Polskiej</CardTitle>
        </CardHeader>
        <CardContent>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Dane nadawcy</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.sender.name}
                    onChange={(e) => handleChange('sender', 'name', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.sender.addressLine1}
                    onChange={(e) => handleChange('sender', 'addressLine1', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.sender.addressLine2}
                    onChange={(e) => handleChange('sender', 'addressLine2', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formData.sender.postalCode}
                      onChange={(e) => handleChange('sender', 'postalCode', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formData.sender.city}
                      onChange={(e) => handleChange('sender', 'city', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.senderNotification.enabled}
                    onChange={(e) => handleChange('senderNotification', 'enabled', e.target.checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Potwierdzenie doręczenia
                  </label>
                </div>
                
                {formData.senderNotification.enabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS/Email
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formData.senderNotification.contact}
                      onChange={(e) => handleChange('senderNotification', 'contact', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Dane adresata</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.recipient.name}
                    onChange={(e) => handleChange('recipient', 'name', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.recipient.addressLine1}
                    onChange={(e) => handleChange('recipient', 'addressLine1', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.recipient.addressLine2}
                    onChange={(e) => handleChange('recipient', 'addressLine2', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formData.recipient.postalCode}
                      onChange={(e) => handleChange('recipient', 'postalCode', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formData.recipient.city}
                      onChange={(e) => handleChange('recipient', 'city', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kraj
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.recipient.country}
                    onChange={(e) => handleChange('recipient', 'country', e.target.value)}
                  />
                </div>
                
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.recipientNotification.enabled}
                    onChange={(e) => handleChange('recipientNotification', 'enabled', e.target.checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Powiadomienie adresata
                  </label>
                </div>
                
                {formData.recipientNotification.enabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS/Email
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formData.recipientNotification.contact}
                      onChange={(e) => handleChange('recipientNotification', 'contact', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Opcje przesyłki</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.options.deliveryConfirmation}
                    onChange={(e) => handleChange('options', 'deliveryConfirmation', e.target.checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Delivery confirmation
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.options.priority}
                    onChange={(e) => handleChange('options', 'priority', e.target.checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Priority
                  </label>
                </div>
              </div>
            
            </div>
          </div>
          


        </CardContent>
        <div className="flex justify-center p-6 border-t">
          <button
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            onClick={handlePrint}
          >
            Print Form
          </button>
        </div>
      </Card>
      
      {/* Hidden printable form */}
      <style>{formStyles}</style>
      <div id="printable-form" className="mb-8">
        <div className="form-container">
          <div className="logo">
            <img src="/logo.svg" alt="Poczta Polska" />
          </div>
          <div className="form-title">POTWIERDZENIE NADANIA</div>
          <div className="form-row tracking-number-line">
            <span>Przesyłki poleconej nr:</span>
            <div className="dotted-line">{formData.trackingNumber}</div>
          </div>
          
          <div className="form-row">
            <div className="section-title">NADAWCA:</div>
            <div className="form-field">{formData.sender.name}</div>
            <div className="form-field">{formData.sender.addressLine1}</div>
            {formData.sender.addressLine2 && <div className="form-field">{formData.sender.addressLine2}</div>}
            <div className="postal-details">
              <div>
                <div className="form-field">
                  <span className="postal-code">{formData.sender.postalCode}</span>
                </div>
                <div className="postal-label">Kod pocztowy</div>
              </div>
              <div>
                <div className="form-field">{formData.sender.city}</div>
                <div className="postal-label">Miejscowość</div>
              </div>
            </div>
          </div>
          
          <div className="notification-box">
            <div className="form-row">
              <span className={`checkbox ${formData.senderNotification.enabled ? 'checked' : ''}`}></span>
              Potwierdzenie doręczenia albo zwrotu dla nadawcy
            </div>
            
            <div className="form-row notification-section">
              <span>SMS/E-MAIL:</span>
              <div className="dotted-line">{formData.senderNotification.enabled ? formData.senderNotification.contact : ''}</div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="section-title">ADRESAT:</div>
            <div className="form-field">{formData.recipient.name}</div>
            <div className="form-field">{formData.recipient.addressLine1}</div>
            {formData.recipient.addressLine2 && <div className="form-field">{formData.recipient.addressLine2}</div>}
               <div className="postal-details">
              <div>
                <div className="form-field">
                  <span className="postal-code">{formData.recipient.postalCode}</span>
                </div>
                <div className="postal-label">Kod pocztowy</div>
              </div>
              <div>
                <div className="form-field">{formData.recipient.city}</div>
                <div className="postal-label">Miejscowość</div>
              </div>
            </div>
            <div className="country-field">
              <div className="form-field">{formData.recipient.country || ''}</div>
              <div className="postal-label">Kraj</div>
            </div>
          </div>
          
          <div className="notification-box">
            <div className="form-row">
              <span className={`checkbox ${formData.recipientNotification.enabled ? 'checked' : ''}`}></span>
              Awizo dla adresata
            </div>
            
            <div className="form-row notification-section">
              <span>SMS/E-MAIL:</span>
              <div className="dotted-line">{formData.recipientNotification.enabled ? formData.recipientNotification.contact : ''}</div>
            </div>
          </div>
          
          <div className="form-row">
            <span className={`checkbox ${formData.options.deliveryConfirmation ? 'checked' : ''}`}></span>
            Potwierdzenie odbioru
            
            <span style={{ marginLeft: '40px' }}></span>
            
            <span className={`checkbox ${formData.options.priority ? 'checked' : ''}`}></span>
            Priorytetowa
          </div>
          
          <div className="form-row" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="checkbox"></span>
              <span style={{ marginLeft: '5px' }}>S</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="checkbox"></span>
              <span style={{ marginLeft: '5px' }}>M</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="checkbox"></span>
              <span style={{ marginLeft: '5px' }}>L</span>
            </div>
            <span>Format</span>
          </div>

          <div className="bottom-row">
            <div>
              <span>Masa</span>
              <div className="measurement-box"></div>
              <span>kg</span>
              <div className="measurement-box"></div>
              <span>g</span>
            </div>
            <div>
              <span>Opłata</span>
              <div className="measurement-box"></div>
              <span>zł</span>
              <div className="measurement-box"></div>
              <span>gr</span>
            </div>
            <div className="stamp-circle"></div>
          </div>
          
          <div className="footer">
            <span>PP S.A. nr <span className="bold">11</span></span>
            <span>Wydział Poligrafii OI Wrocław 2024</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center mt-4">Data is processed locally in your browser. No data is sent to any server.</p>
    </div>
  );
};

export default PostalFormApp;
