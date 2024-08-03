
export default function GoogleMap() {
    return (
        <div className="map rounded-4 overflow-hidden" style={{ width: '100%', height: '500px' }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1484792.2855454234!2d30.184630327644598!3d30.181926977325386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841bc34bac485%3A0x2c99f353b1bdf022!2z2LTYsdmD2Kkg2KfZhNio2KfZgtmI2LHZiiDZhNiq2YjZg9mK2YTYp9iqINin2YTYqNi32KfYsdmK2KfYqg!5e0!3m2!1sen!2seg!4v1722695878820!5m2!1sen!2seg" 
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}
