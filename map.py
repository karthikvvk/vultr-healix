from flask import Flask, jsonify
from flask_cors import CORS
import googlemaps
import requests


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


def get_location_from_ip():
    try:
        # Get the public IP address of the user (you can also use request.remote_addr in Flask)
        response = requests.get('https://ipinfo.io/json')
        data = response.json()
        
        # Extract latitude and longitude from the response
        loc = data.get('loc', '').split(',')
        latitude = loc[0]
        longitude = loc[1]
        
        return latitude, longitude
    except Exception as e:
        print(f"Error fetching location: {e}")
        return None, None



# Function to fetch nearby places from Google Maps
def fetch_nearby_places(api_key, lat, lng, keyword, radius=1000):
    gmaps = googlemaps.Client(key=api_key)
    # Fetch nearby places using Google Maps API
    nearby_places = gmaps.places_nearby(location=(lat, lng), radius=radius, keyword=keyword)
    
    # Map the results into a structured format as per the second code snippet
    results = []
    for place in nearby_places['results']:
        place_info = {
            "name": place.get("name"),
            "vicinity": place.get("vicinity"),
            "rating": place.get("rating", "N/A"),  # Handle missing rating
            "international_phone_number": place.get("international_phone_number", "N/A"),  # Placeholder for phone number
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
    # Replace with your actual Google Maps API Key
    api_key = ""  # Insert your Google Maps API Key here
    latitude, longitude = get_location_from_ip()
    keyword = "hospital"  # Searching for hospitals
    radius = 1000  # Radius for nearby places (meters)

    try:
        # Fetch nearby places from Google Maps API
        nearby_places = fetch_nearby_places(api_key, latitude, longitude, keyword, radius)
        
        # If no results were returned, you can send mock data as a fallback (optional)
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

        # Return the fetched or mock data as JSON response
        return jsonify(nearby_places)

    except Exception as e:
        # In case of error while calling the API or other issues, return an error message
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask server
    print("Starting Flask server on 0.0.0.0:5000...")
    app.run(debug=True, host='0.0.0.0', port=5000)
