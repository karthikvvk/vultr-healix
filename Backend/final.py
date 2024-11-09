from flask import Flask, jsonify
from flask_cors import CORS
import googlemaps
import requests

app = Flask(__name__)
CORS(app)

def get_location_from_ip():
    try:
        response = requests.get('https://ipinfo.io/json')
        data = response.json()
        loc = data.get('loc', '').split(',')
        latitude = loc[0]
        longitude = loc[1]
        return latitude, longitude
    except Exception as e:
        print(f"Error fetching location: {e}")
        return None, None

def fetch_nearby_places(api_key, lat, lng, keyword, radius=1000):
    gmaps = googlemaps.Client(key=api_key)
    nearby_places = gmaps.places_nearby(location=(lat, lng), radius=radius, keyword=keyword)
    
    results = []
    for place in nearby_places['results']:
        place_info = {
            "name": place.get("name"),
            "vicinity": place.get("vicinity"),
            "rating": place.get("rating", "N/A"),
            "international_phone_number": place.get("international_phone_number", "N/A"),
            "geometry": {
                "location": {
                    "lat": place["geometry"]["location"]["lat"],
                    "lng": place["geometry"]["location"]["lng"]
                }
            }
        }
        results.append(place_info)
    return results

@app.route('/api/nearby-places', methods=['GET'])
def get_nearby_places():
    api_key = ""
    latitude, longitude = get_location_from_ip()
    keyword = "hospital"
    radius = 1000

    try:
        nearby_places = fetch_nearby_places(api_key, latitude, longitude, keyword, radius)
        
        if not nearby_places:
            nearby_places = [
                {
                    "name": "Hospital A",
                    "vicinity": "",
                    "rating": 0,
                    "international_phone_number": "",
                    "geometry": {
                        "location": {
                            "lat": 12.9716,
                            "lng": 77.5946
                        }
                    }
                },
                {
                    "name": "Hospital B",
                    "vicinity": "",
                    "rating": 0,
                    "international_phone_number": "",
                    "geometry": {
                        "location": {
                            "lat": 2.9616,
                            "lng": 77.5846
                        }
                    }
                }
            ]

        return jsonify(nearby_places)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask server on 0.0.0.0:5000...")
    app.run(debug=True, host='0.0.0.0', port=5000)
