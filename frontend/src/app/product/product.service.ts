import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Product } from './product.model'
import { Options } from '../models/options'
import { SelectItem } from 'primeng/api'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl

  getProductList(options: Options) {
    const { limit, skip, search } = options
    let params = new HttpParams()
    let obj = {}
    if (search) { Object.assign(obj, { name: search }) }
    params = params.set('filter', JSON.stringify({"where": obj, limit, offset: skip}))
    return this.http.get(this.apiUrl + '/product', { params })
  }

  getProductOptionList() {
    let params = new HttpParams()
    params = params.set('filter[fields][id]', true)
    params = params.set('filter[fields][name]', true)
    return this.http.get<SelectItem[]>(`${this.apiUrl}/product`, { params })
  }

  createProduct(product: Product) {
    return this.http.post(this.apiUrl + '/product', product)
  }

  updateProduct(id: number, product: Product) {
    return this.http.put(`${this.apiUrl}/product/${id}`, product)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/product/${id}`)
  }
}
