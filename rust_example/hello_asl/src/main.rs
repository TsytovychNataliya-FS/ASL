use chrono::prelude::*;

fn main() {
    println!("Hello ASL!");
    let now: DateTime<Utc> = Utc::now();
    println!("Today's date is: {}", now);
}
