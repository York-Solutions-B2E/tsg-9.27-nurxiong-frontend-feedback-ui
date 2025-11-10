// --- StarRating Component ---
// @ts-ignore
export function StarRating({value, onChange, size = 24}) {

    return (
        <div>
            {[1, 2, 3, 4, 5].map((ratingValue) => (
                <span
                    key={ratingValue}
                    onClick={() => onChange(ratingValue)}
                    style={{
                        cursor: "pointer",
                        fontSize: size,
                        color: ratingValue <= value ? "#ffc107" : "#e4e5e9",
                    }}
                >
          ★
        </span>
            ))}
        </div>
    );
}
