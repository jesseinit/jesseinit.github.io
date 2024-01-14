export async function fetchData() {
    const response = await fetch('/api/v1/rates');
    const data = await response.json();
    return data;
}