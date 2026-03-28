'use client';

interface LetterProps {
    title: string;
    body: string;
}

export const LetterCard = ({ title, body }: LetterProps) => {
    return (
        <div className="mx-4 mb-12">
            <div 
                className="letter-card-animate"
                style={{
                    backgroundColor: 'rgba(30, 27, 75, 0.75)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    padding: '40px',
                    borderRadius: '32px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    display: 'block',
                    position: 'relative'
                }}
            >
                <h2 
                    className="old-school-script" 
                    style={{ 
                        color: '#f1f5f9', 
                        fontSize: '2.5rem', 
                        marginBottom: '1.5rem', 
                        fontStyle: 'italic'
                    }}
                >
                    {title}
                </h2>

                <p 
                    className="old-school-script" 
                    style={{ 
                        color: '#ddd6fe', 
                        fontSize: '1.5rem', 
                        lineHeight: '1.6',
                        fontStyle: 'italic',
                        whiteSpace: 'pre-line'
                    }}
                >
                    {body}
                </p>
            </div>
        </div>
    );
};