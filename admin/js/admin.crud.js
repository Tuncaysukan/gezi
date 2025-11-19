/**
 * Generic CRUD Handler with SweetAlert2, jQuery, DataTables
 * Tüm admin sayfaları için ortak CRUD işlemleri
 */

const CRUD = {
    // API Base URL
    apiUrl: '../api/crud.php',
    
    // DataTable instance'ları
    tables: {},
    
    /**
     * DataTable Başlat
     */
    initDataTable: function(tableId, tableName, columns, columnDefs = []) {
        if ($.fn.DataTable.isDataTable(`#${tableId}`)) {
            $(`#${tableId}`).DataTable().destroy();
        }
        
        this.tables[tableId] = $(`#${tableId}`).DataTable({
            ajax: {
                url: `${this.apiUrl}?action=list&table=${tableName}`,
                dataSrc: function(json) {
                    console.log('DataTable received:', json);
                    if (json.success && json.data) {
                        return json.data;
                    }
                    return [];
                }
            },
            columns: columns,
            columnDefs: columnDefs,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/tr.json'
            },
            responsive: true,
            order: [[0, 'desc']],
            pageLength: 25,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excel',
                    text: '<i class="fas fa-file-excel"></i> Excel',
                    className: 'btn btn-success btn-sm'
                },
                {
                    extend: 'pdf',
                    text: '<i class="fas fa-file-pdf"></i> PDF',
                    className: 'btn btn-danger btn-sm'
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Yazdır',
                    className: 'btn btn-info btn-sm'
                }
            ]
        });
    },
    
    /**
     * Yenile DataTable
     */
    reloadTable: function(tableId) {
        if (this.tables[tableId]) {
            this.tables[tableId].ajax.reload(null, false);
        }
    },
    
    /**
     * OLUŞTUR
     */
    create: function(tableName, data, successCallback) {
        console.log('Creating:', tableName, data);
        $.ajax({
            url: `${this.apiUrl}?action=create&table=${tableName}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                console.log('Create Response:', response);
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Başarılı!',
                        text: response.message,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    if (successCallback) successCallback(response);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata!',
                        text: response.message
                    });
                }
            },
            error: function(xhr) {
                console.error('Create Error:', xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Bir hata oluştu: ' + xhr.responseText
                });
            }
        });
    },
    
    /**
     * GÜNCELLE
     */
    update: function(tableName, id, data, successCallback) {
        $.ajax({
            url: `${this.apiUrl}?action=update&table=${tableName}&id=${id}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Başarılı!',
                        text: response.message,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    if (successCallback) successCallback(response);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata!',
                        text: response.message
                    });
                }
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Bir hata oluştu: ' + xhr.responseText
                });
            }
        });
    },
    
    /**
     * SİL
     */
    delete: function(tableName, id, successCallback) {
        Swal.fire({
            title: 'Emin misiniz?',
            text: "Bu işlem geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: 'İptal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${this.apiUrl}?action=delete&table=${tableName}&id=${id}`,
                    type: 'POST',
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Silindi!',
                                text: response.message,
                                timer: 2000,
                                showConfirmButton: false
                            });
                            if (successCallback) successCallback(response);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Hata!',
                                text: response.message
                            });
                        }
                    },
                    error: function(xhr) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hata!',
                            text: 'Bir hata oluştu: ' + xhr.responseText
                        });
                    }
                });
            }
        });
    },
    
    /**
     * AKTİF/PASİF DURUMU DEĞİŞTİR
     */
    toggle: function(tableName, id, successCallback) {
        $.ajax({
            url: `${this.apiUrl}?action=toggle&table=${tableName}&id=${id}`,
            type: 'POST',
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Başarılı!',
                        text: response.message,
                        timer: 1500,
                        showConfirmButton: false
                    });
                    if (successCallback) successCallback(response);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata!',
                        text: response.message
                    });
                }
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Bir hata oluştu: ' + xhr.responseText
                });
            }
        });
    },
    
    /**
     * SIRA GÜNCELLE
     */
    updateOrder: function(tableName, id, order, successCallback) {
        $.ajax({
            url: `${this.apiUrl}?action=order&table=${tableName}&id=${id}&order=${order}`,
            type: 'POST',
            success: function(response) {
                if (response.success) {
                    if (successCallback) successCallback(response);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata!',
                        text: response.message
                    });
                }
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Bir hata oluştu: ' + xhr.responseText
                });
            }
        });
    },
    
    /**
     * TEK KAYIT GETİR
     */
    get: function(tableName, id, successCallback) {
        $.ajax({
            url: `${this.apiUrl}?action=get&table=${tableName}&id=${id}`,
            type: 'GET',
            success: function(response) {
                if (response.success) {
                    if (successCallback) successCallback(response.data);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata!',
                        text: response.message
                    });
                }
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Bir hata oluştu: ' + xhr.responseText
                });
            }
        });
    },
    
    /**
     * FORM HELPER - Form verilerini JSON'a çevir
     */
    serializeForm: function(formId) {
        const formData = {};
        $(`#${formId}`).serializeArray().forEach(field => {
            // Hidden id alanını atlat (boş ise)
            if (field.name === 'id' && !field.value) {
                return;
            }
            formData[field.name] = field.value;
        });
        return formData;
    },
    
    /**
     * FORM HELPER - Formu temizle
     */
    resetForm: function(formId) {
        $(`#${formId}`)[0].reset();
    },
    
    /**
     * FORM HELPER - Forma veri doldur
     */
    fillForm: function(formId, data) {
        Object.keys(data).forEach(key => {
            const input = $(`#${formId} [name="${key}"]`);
            if (input.attr('type') === 'checkbox') {
                input.prop('checked', data[key] == 1);
            } else {
                input.val(data[key]);
            }
        });
    }
};

// Global olarak erişilebilir yap
window.CRUD = CRUD;
