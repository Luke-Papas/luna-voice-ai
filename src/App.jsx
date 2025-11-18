import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

export default function LogisticsForm() {
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [equipment, setEquipment] = useState('');
  const departureInputRef = useRef(null);
  const destinationInputRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
        script.async = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
      } else {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      if (departureInputRef.current) {
        new window.google.maps.places.Autocomplete(departureInputRef.current, { types: ['geocode'] });
      }
      if (destinationInputRef.current) {
        new window.google.maps.places.Autocomplete(destinationInputRef.current, { types: ['geocode'] });
      }
    };

    loadGoogleMaps();
  }, []);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min of ['00', '30']) {
        times.push(`${hour.toString().padStart(2, '0')}:${min}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <Card className="w-full max-w-lg sm:max-w-xl shadow-2xl rounded-2xl border border-gray-200">
        <CardContent className="p-4 sm:p-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">Travel Quote Request</h1>

          <div className="space-y-4">
            <div>
              <Label>Departure Location</Label>
              <div className="flex items-center border rounded-lg p-2">
                <MapPin className="mr-2 text-gray-500" />
                <Input ref={departureInputRef} placeholder="Start typing a location..." />
              </div>
            </div>

            <div>
              <Label>Destination</Label>
              <div className="flex items-center border rounded-lg p-2">
                <MapPin className="mr-2 text-gray-500" />
                <Input ref={destinationInputRef} placeholder="Start typing a location..." />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Date of Departure</Label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-2"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>

              <div>
                <Label>Date of Arrival</Label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-2"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Time of Departure</Label>
                <div className="flex items-center border rounded-lg p-2">
                  <Clock className="mr-2 text-gray-500" />
                  <select className="w-full bg-transparent outline-none" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)}>
                    <option value="">Select time</option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>Time of Arrival</Label>
                <div className="flex items-center border rounded-lg p-2">
                  <Clock className="mr-2 text-gray-500" />
                  <select className="w-full bg-transparent outline-none" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)}>
                    <option value="">Select time</option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <Label>Client Name</Label>
              <Input placeholder="Enter client name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </div>

            <div>
              <Label>Equipment</Label>
              <select className="w-full border rounded-lg p-2" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
                <option value="">Select equipment</option>
                <option value="Truck">Truck</option>
                <option value="Excavator">Excavator</option>
                <option value="Bulldozer">Bulldozer</option>
                <option value="Crane">Crane</option>
              </select>
            </div>

            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
              Submit Quote Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


