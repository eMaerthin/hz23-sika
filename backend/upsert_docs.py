import os
import requests
import zipfile
from tqdm import tqdm
from dotenv import load_dotenv

load_dotenv()
url = 'https://aka.ms/hackzurich2023/sika'
destination_file = 'data/downloaded_file.zip'  # Specify the destination file name

if not os.path.exists(destination_file):
    # Destination directory for unzipping
    destination_directory = 'data/'

    # Send a GET request to the URL to download the file
    response = requests.get(url, stream=True)

    if response.status_code == 200:
        with open(destination_file, 'wb') as file:
            for chunk in tqdm(response.iter_content(chunk_size=8192)):
                if chunk:
                    file.write(chunk)

        print(f"Downloaded file to {destination_file}")

        # Unzip the downloaded file to the specified directory
        with zipfile.ZipFile(destination_file, 'r') as zip_ref:
            zip_ref.extractall(destination_directory)

        print(f"Unzipped to {destination_directory}")
    else:
        print(f"Failed to download the file. Status code: {response.status_code}")

directory_path = 'data/Material for HackZurich'  # Replace with the directory path you want to list files from

# Iterate through all files (including subdirectories) under the specified path
# Headers

url = 'http://localhost:8080/upsert-file'
headers = {
    'Authorization': 'Bearer testtest',  # Replace with your actual bearer token
}

#url = 'http://0.0.0.0:8080/upsert-file'

for root, dirs, files in os.walk(directory_path):
    for file in files:
        file_path = os.path.join(root, file)
        with open(file_path, 'rb') as f:
            # File data
            files = {
                'file': (file, f, 'application/pdf')
            }
            response = requests.post(url, headers=headers, files=files)

            # Check the response
            if response.status_code == 200:
                print("File {file} uploaded successfully.")
            else:
                print(f"File upload failed. Status code: {response.status_code} {response.text}")
